import { User } from '../models/user-model.js'
import { querySpecificSnippetForHbs } from '../modules/query.js'
import hljs from 'highlight.js'
import moment from 'moment'

/**
 * A controller for requests associated with snippets.
 */
export class SnippetController {
  /**
   * Renders the page to create a new snippet.
   *
   * @param {object} req Express request object.
   * @param {object} res Express response object.
   * @param {Function} next Next middleware function.
   */
  getCreateSnippet (req, res, next) {
    const viewData = {
      loggedIn: req.session.loggedIn
    }
    res.render('snippets/create', viewData)
  }

  /**
   * Handles the post request to make a new snippet.
   * Searches the database for a user based on the username stored in the session, and then updates the database.
   *
   * @param {object} req Express request object.
   * @param {object} res Express response object.
   * @param {Function} next Next middleware function.
   */
  async postCreateSnippet (req, res, next) {
    try {
      const findUserResult = await User.findOne({ username: req.session.username })
      findUserResult.snippets.push({ title: req.body.title, textcontent: req.body.textcontent, created_at: Date.now() })
      await findUserResult.save()
      res.redirect('..')
    } catch (error) {
      console.log(`Error in post create snippet: ${error}`)
      req.session.flash = { type: 'danger', text: `Could not submit snippet: ${error}` }
      res.redirect('./create')
    }
  }

  /**
   * Renders the page to view a specific snippet.
   * Searches in the database for the targeted snippet used as data when rendering.
   *
   * @param {object} req Express request object.
   * @param {object} res Express response object.
   * @param {Function} next Next middleware function.
   */
  async getViewSpecificSnippet (req, res, next) {
    const queryResponse = await querySpecificSnippetForHbs(req, User)
    const highlight = hljs.highlightAuto(queryResponse.targetSnippet.textcontent).value
    const viewData = {
      loggedIn: req.session.loggedIn,
      title: queryResponse.targetSnippet.title,
      textcontent: queryResponse.targetSnippet.textcontent,
      owner: queryResponse.snippetOwner === req.session.username,
      _id: req.params.id,
      code: highlight
    }
    res.render('snippets/view', viewData)
  }

  /**
   * Renders the page to edit a snippet.
   * Searches in the database for the targeted snippet, used as data when rendering.
   *
   * @param {object} req Express request object.
   * @param {object} res Express response object.
   * @param {Function} next Next middleware function.
   */
  async getEditSnippet (req, res, next) {
    const queryResponse = await querySpecificSnippetForHbs(req, User, next)
    const viewData = {
      loggedIn: req.session.loggedIn,
      title: queryResponse.targetSnippet.title,
      textcontent: queryResponse.targetSnippet.textcontent,
      owner: queryResponse.snippetOwner === req.session.username,
      _id: req.params.id
    }
    res.render('snippets/edit', viewData)
  }

  /**
   * Handles the post request to edit a snippet.
   * Queries the database for a specific user based on the id extracted from the request object.
   * Updates the specific queried entry with new information and saves it to the database.
   *
   * @param {object} req Express request object.
   * @param {object} res Express response object.
   * @param {Function} next Next middleware function.
   */
  async postEditSnippet (req, res, next) {
    const id = req.params.id
    const dbResponse = await User.findOne({ 'snippets._id': id })
    // Uses a loop to find the exact snippet that should be updated since I got "DivergentArrayError" trying to use projection or query conditions.
    for (let i = 0; i < dbResponse.snippets.length; i++) {
      if (dbResponse.snippets[i]._id.toString() === id) {
        dbResponse.snippets[i].title = req.body.title
        dbResponse.snippets[i].textcontent = req.body.textcontent
      }
    }
    dbResponse.save()
    res.redirect('../../')
  }

  /**
   * Handles the get request to delete a snippet.
   * Searches the database to find the targeted snippet and user, then removes the snippet from the database.
   *
   * @param {object} req Express request object.
   * @param {object} res Express response object.
   * @param {Function} next Next middleware function.
   */
  async getDeleteSnippet (req, res, next) {
    const id = req.params.id
    const dbResponse = await User.findOne({ 'snippets._id': id })
    dbResponse.snippets = dbResponse.snippets.filter(snippet => snippet._id.toString() !== id)
    dbResponse.save()
    res.redirect('../../')
  }

  /**
   * Renders the page to see personal snippets.
   * Gets data from the database based on the username.
   *
   * @param {object} req Express request object.
   * @param {object} res Express response object.
   * @param {Function} next Next middleware function.
   */
  async getMySnippets (req, res, next) {
    const user = await User.findOne({ username: req.session.username }).lean()
    for (const snippet of user.snippets) {
      snippet.created_at = moment(snippet.created_at).fromNow()
    }

    const viewData = {
      loggedIn: req.session.loggedIn,
      snippets: user.snippets
    }
    res.render('snippets/mysnippets', viewData)
  }
}
