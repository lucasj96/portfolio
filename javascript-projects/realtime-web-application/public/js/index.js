import '../socket.io/socket.io.js'

console.log('index.js')
const socket = window.io('', { path: '/issues-app/socket.io' })
const DOMPurify = window.DOMPurify()

// Change the textcontent of the updated issue
socket.on('issueUpdated', arg => {
  // console.log('Client socket "issueUpdated" received update')
  const targetIssueStateSpan = document.querySelector(`#issue-${arg.issueIid}-state`)
  targetIssueStateSpan.textContent = arg.state
})

socket.on('issueCreated', issueObject => {
  // console.log('Client socket "issueCreated" received update')
  createNewIssueElement(issueObject)
})

/**
 * Creates and appends a new element to the dom representing an issue.
 * The elements innerHTML is filtered to prevent XXS attacks.
 *
 * @param {object} issueAttributes - Values used by the element.
 */
const createNewIssueElement = (issueAttributes) => {
  const issueDiv = document.createElement('div')
  issueDiv.setAttribute('id', `issue-${issueAttributes.iid}`)
  issueDiv.setAttribute('class', 'issue')

  // The string with associated HTML attributes and content to be used as inner HTML.
  const issueInnerHTML = `
    ID: <span id="issue-${issueAttributes.id}-id">${issueAttributes.id}</span>,
    IID: <span id="issue-${issueAttributes.iid}-iid">${issueAttributes.iid}</span>,
    Title: <span id="issue-${issueAttributes.iid}-title">${issueAttributes.title}</span>,
    State: <span id="issue-${issueAttributes.iid}-state">${issueAttributes.state}</span>
    <br>
    <img src=${issueAttributes.author.avatar_url} class="avatar">
    Author: ${issueAttributes.author.name}
    <br>
    Description: ${issueAttributes.description}
    <br>
    <button custom-iid="${issueAttributes.iid}" id="open${issueAttributes.id}" class="btn btn-primary btn-sm openbutton">Open</button>
    <button custom-iid="${issueAttributes.iid}" id="close${issueAttributes.id}" class="btn btn-primary btn-sm closebutton">Close</button>
  `

  issueDiv.innerHTML = DOMPurify.sanitize(issueInnerHTML)
  document.querySelector('#index').appendChild(issueDiv)
}

const closeIssueButtons = Array.from(document.querySelectorAll('.closebutton'))
const openIssueButtons = Array.from(document.querySelectorAll('.openbutton'))

// Adds event listener to close button, eventlistener makes a POST requests to close related issue.
for (const button of closeIssueButtons) {
  bindButton(button, false)
}

// Adds event listener to open button, eventlistener makes a POST requests to open related issue.
for (const button of openIssueButtons) {
  bindButton(button, true)
}

/**
 * Adds event listener to a button.
 * When triggered calls a function to make a POST request to update an issue.
 *
 * @param {HTMLElement} button - The button to add the event listener to.
 * @param {boolean} shouldOpenIssue - True to open issue, false to close.
 */
function bindButton (button, shouldOpenIssue) {
  button.addEventListener('click', async (event) => {
    const issueIid = event.target.attributes['custom-iid'].value
    await postUpdateIssueState(issueIid, shouldOpenIssue)
  })
}

/**
 * Makes a post request to the server, which in turn makes a request to gitlab with the access token.
 * Used to update the state of an issue by closing or opening it.
 *
 * @param {number} iid - The IID of the issue to edit.
 * @param {string} shouldOpenIssue - Wether to open or close the issue.
 * @returns {object} - The response of the request.
 */
const postUpdateIssueState = async (iid, shouldOpenIssue) => {
  const data = { iid: iid, shouldOpenIssue: shouldOpenIssue }
  try {
    await fetch('./update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
  } catch (error) {
    console.log(error)
  }
}
