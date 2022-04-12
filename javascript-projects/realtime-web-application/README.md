# Assignment 3 - Realtime Web Application

This project was created for an assignment at Linnaeus University, with the following objective "you will be writing a web application that includes realtime web technologies such as WebSocket and webhook. You must put the application into production on a public server". 

The idea behind the application is that you should be able to list, create and comment on issues from a GitLab repository that you have "owner"-access to using a web-hook.

The application is a Node.js Application, using express.

## The web application

1. When a client connects to the application, it will use the GitLab API, a REST API, to fetch your [project's issues](https://docs.gitlab.com/ee/api/issues.html#list-project-issues). (#12)
2. When your application has retrieved the issues from your repository, the application should render the issues into HTML along with the JavaScript needed and send it all as a response to the client. (#12)
3. One thing the client-script needs to do is, for example, to connect to your server's WebSocket channel. (#13)
4. You must configure your GitLab repository to fire a webhook for your application to receive when a new issue event occurs in said repository. (#13)
5. The application must use the WebSocket channel(s) to transmit the received and transformed payload to the client in realtime. (#13)

When the application is running, the user must also be able to:

* Close issues from the client-side application. 
* Do one more thing towards the issues. You decide this yourself. 

If a user requests a non-existent resource, the application must return the HTTP status code 404 (Not Found). The HTTP status code 500 (Internal Server Error) must only be returned when it is really necessary.

As far as possible, be sure to protect the application from vulnerable attacks.

The application should be deployed on a given server in CSCloud.

API-keys and webhook tokens should be stored in environment variables and should not be shared with anyone. 

When handing in the assignemnt, the assignment report must be answerded. 
