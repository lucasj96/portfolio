import config from '../config/config.js'

/**
 * Compares the access token in .env with the git lab token in the header.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
export async function verifySecretToken (req, res, next) {
  if (req.headers['x-gitlab-token'] !== config.WEBHOOK_TOKEN) {
    res.status(401).send('Invalid secret token')
    return
  }
  next()
}
