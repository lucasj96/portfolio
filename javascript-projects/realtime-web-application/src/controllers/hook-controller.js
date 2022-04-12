/**
 * Controller for the webhook requests.
 */
export class HookController {
  /**
   * Handles POST requests associated with "Issue events" from the Gitlab Webhook.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  postWebhookIssue (req, res, next) {
    const objectAttributes = req.body.object_attributes
    const hookAction = objectAttributes.action

    // If an issue should be open or closed.
    if (hookAction === 'close' || hookAction === 'reopen') {
      res.io.emit('issueUpdated', {
        body: req.body,
        issueIid: req.body.object_attributes.iid,
        state: req.body.object_attributes.state
      })

    // If a new issue has been made
    } else if (hookAction === 'open') {
      res.io.emit('issueCreated', {
        body: req.body,
        id: objectAttributes.id,
        iid: objectAttributes.iid,
        title: objectAttributes.title,
        state: objectAttributes.state,
        description: objectAttributes.description,
        author: req.body.user
      })
    }
    res.status(200).send('Hook accepted')
  }
}
