/**
 * Queries the database and selects the username and the specific requested snippet.
 * Uses lean() to be rendered with hbs.
 *
 * @param {object} req Express request object.
 * @param {object} User A model object, used to query the database.
 * @returns {object} Containing information about the snippet and the username of the snippet owner.
 */
export async function querySpecificSnippetForHbs (req, User) {
  const targetUser = await User.findOne({ 'snippets._id': req.params.id }).select({ snippets: { $elemMatch: { _id: req.params.id } }, username: 1 }).lean()

  const targetSnippet = targetUser.snippets[0]
  const snippetOwner = targetUser.username

  return { targetSnippet, snippetOwner }
}
