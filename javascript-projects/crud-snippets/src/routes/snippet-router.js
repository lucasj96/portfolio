// Router delegating requests to snippets.
import express from 'express'
import { User } from '../models/user-model.js'
import { SnippetController } from '../controllers/snippet-controller.js'
import httpError from 'http-errors'
export const router = express.Router()

const controller = new SnippetController()

/**
 * Middleware used to handle bad/illigal requests.
 * Searches the database for a user and returns adequate http errors.
 *
 * @param {object} req Express request object.
 * @param {object} res Express response object.
 * @param {Function} next Next middleware function.
 * @returns {undefined} Used only to cancel execution of the middleware.
 */
async function unauthorizedAccess (req, res, next) {
  // User is not logged in return 404
  if (!req.session.loggedIn) {
    return next(httpError(404, '404'))
  }

  const dbTest = await User.findOne({ username: req.session.username }).select({ snippets: { $elemMatch: { _id: req.params.id } } })

  // Did not find user by username
  if (!dbTest || dbTest === null) {
    return next(httpError(500, '500'))
  }

  // Logged in user is not the author of snippet
  if (dbTest.snippets.length === 0) {
    return next(httpError(403, '403'))
  }
  next()
}

/**
 * Middleware used to handle unauthorized requests.
 *
 * @param {object} req Express request object.
 * @param {object} res Express response object.
 * @param {Function} next Next middleware function.
 * @returns {undefined} Used only to cancel execution of the middleware.
 */
async function loggedInFeatures (req, res, next) {
  // User is not logged in return 404
  if (!req.session.loggedIn) {
    return next(httpError(404, '404'))
  }
  next()
}

router.get('/create', loggedInFeatures, controller.getCreateSnippet)
router.post('/create', loggedInFeatures, controller.postCreateSnippet)
router.get('/view/:id', controller.getViewSpecificSnippet)
router.get('/edit/:id', unauthorizedAccess, controller.getEditSnippet)
router.post('/edit/:id', unauthorizedAccess, controller.postEditSnippet)
router.get('/delete/:id', unauthorizedAccess, controller.getDeleteSnippet)
router.get('/mysnippets', loggedInFeatures, controller.getMySnippets)
