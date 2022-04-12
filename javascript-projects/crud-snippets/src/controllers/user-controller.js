import { User } from '../models/user-model.js'
import moment from 'moment'

/**
 * A controller for requests associated with users.
 */
export class UserController {
  /**
   * Renders the index page.
   *
   * @param {object} req Express request object.
   * @param {object} res Express response object.
   * @param {Function} next Next middleware function.
   */
  async getIndex (req, res, next) {
    const dbResponse = await User.find().lean()
    for (const user of dbResponse) {
      for (const snippet of user.snippets) {
        snippet.created_at = moment(snippet.created_at).fromNow()
      }
    }

    const viewData = {
      loggedIn: req.session.loggedIn,
      users: dbResponse
    }
    res.render('snippets/index', viewData)
  }

  /**
   * Handles the logout get request.
   * Destroys the associated session.
   *
   * @param {object} req Express request object.
   * @param {object} res Express response object.
   * @param {Function} next Next middleware function.
   */
  getLogout (req, res, next) {
    req.session.destroy()
    res.redirect('./')
  }

  /**
   * Renders the create snippets page.
   *
   * @param {object} req Express request object.
   * @param {object} res Express response object.
   * @param {Function} next Next middleware function.
   */
  getCreateSnippet (req, res, next) {
    const viewData = {
      loggedIn: req.session
    }
    res.render('snippets/create', viewData)
  }

  /**
   * Renders the login page.
   *
   * @param {object} req Express request object.
   * @param {object} res Express response object.
   * @param {Function} next Next middleware function.
   */
  getLogin (req, res, next) {
    res.render('user/login')
  }

  /**
   * Handles the post request to login.
   * Searches the database with the credentials from the request body.
   * If the credentials match set the session variable "loggedIn" to true.
   *
   * @param {object} req Express request object.
   * @param {object} res Express response object.
   * @param {Function} next Next middleware function.
   */
  async postLogin (req, res, next) {
    const { username, password } = req.body
    try {
      await User.authenticate(username, password)
      req.session.loggedIn = true
      req.session.username = username
      res.redirect('.')
    } catch (error) {
      console.log(`Post login error: ${error}`)
      req.session.flash = { type: 'danger', text: `Could not login: ${error}` }
      res.redirect('./login')
    }
  }

  /**
   * Renders the page to register as a user on the site.
   *
   * @param {object} req Express request object.
   * @param {object} res Express response object.
   * @param {Function} next Next middleware function.
   */
  getRegister (req, res, next) {
    res.render('user/register')
  }

  /**
   * Handles the post request to register as a user on the site.
   * Uses the data based on the request body and tries to save a new user entry to the database.
   *
   * @param {object} req Express request object.
   * @param {object} res Express response object.
   * @param {Function} next Next middleware function.
   */
  async postRegister (req, res, next) {
    const reqUsername = req.body.username
    const reqPassword = req.body.password
    try {
      const user = new User({
        username: reqUsername,
        password: await User.hashPassword(reqPassword)
      })
      await user.save()
      req.session.flash = { type: 'success', text: 'Successfully registered' }
      res.redirect('.')
    } catch (error) {
      console.log(`Post register error: ${error}`)
      req.session.flash = { type: 'danger', text: `Could not register: ${error}` }
      res.redirect('./register')
    }
  }
}
