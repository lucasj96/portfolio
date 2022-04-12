import fetch from 'node-fetch'
import config from '../config/config.js'

/**
 * Tries to make a HTTP GET request and return the response as json.
 *
 * @param {string} url - The request URL
 * @param {string} accessToken - Access token from gitlab
 * @returns {object} - The parsed response object.
 */
export async function getAllProjects (url, accessToken) {
  let parsedResponse
  try {
    const fetchResponse = await fetch(url, {
      method: 'GET',
      headers: {
        'PRIVATE-TOKEN': accessToken
      }
    })
    parsedResponse = await fetchResponse.json()
  } catch (error) {
    console.log(error)
  }
  return parsedResponse
}

/**
 * Makes a PUT request to the gitlab api with the access token in it's body.
 *
 * @param {number} iid - The IID for the issue.
 * @param {string} shouldOpenIssue - If the issue should be closed or open.
 * @returns {object} - The response object.
 */
export async function putUpdateIssueState (iid, shouldOpenIssue) {
  const decision = shouldOpenIssue ? 'reopen' : 'close'
  const fetchResponse = await fetch(`https://gitlab.lnu.se/api/v4/projects/13299/issues/${iid}?state_event=${decision}`, {
    method: 'PUT',
    headers: {
      'PRIVATE-TOKEN': config.ACCESS_TOKEN
    }
  })
  return fetchResponse
}
