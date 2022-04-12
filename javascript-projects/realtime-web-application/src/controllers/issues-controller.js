import { getAllProjects, putUpdateIssueState } from '../functions/httpFunctions.js'
import config from '../config/config.js'

/**
 * Controller for issues requests.
 */
export class IssuesController {
  /**
   * Handles GET requests and renders the index page.
   * Makes a HTTP GET request to gitlab to get all issues for one project and uses that data to render the page.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async getIndex (req, res, next) {
    const allProjectsJson = await getAllProjects('https://gitlab.lnu.se/api/v4/projects/13299/issues', config.ACCESS_TOKEN)
    const filteredArray = []

    // Filter the properties from the request we want, reversed order on the loop so the oldest issue is first.
    for (let i = (allProjectsJson.length - 1); i >= 0; i--) {
      const issuesObject = {
        id: allProjectsJson[i].id,
        iid: allProjectsJson[i].iid,
        title: allProjectsJson[i].title,
        state: allProjectsJson[i].state,
        description: allProjectsJson[i].description,
        author: allProjectsJson[i].author
      }
      filteredArray.push(issuesObject)
    }

    const viewData = {
      issues: filteredArray
    }

    res.render('issues/index', viewData)
  }

  /**
   * Handles POST request with data about a specific issue. Makes a PUT request to Gitlab to open or close a issue.
   * The client can make a POST request to this URL, so the access-token for the PUT request is never on the client.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async postUpdateIssueState (req, res, next) {
    const fetchResponse = await putUpdateIssueState(req.body.iid, req.body.shouldOpenIssue)
    if (fetchResponse.status === 200) {
      res.sendStatus(200)
    } else {
      res.sendStatus(fetchResponse.status)
      throw new Error(`Error: postUpdateIssueState HTTP response status not 200. Actual status: ${fetchResponse.status}`)
    }
  }
}
