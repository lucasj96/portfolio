# Readme

This was created in the first year as part of an assignment for a course at Linnaeus University.
The objective was to create an individual software project.

The project was to create a website with React that allow users to upload audio files that then could be edited using the WebAudioAPI, after they had been uploaded and edited they can either be published and rated, storing them using MongoDB, or downloaded without publishing them.

**Disclaimer**, In retrospect, I can say it is not very well done.

#### Path to different files

Serverfiles can be found here
* `nodesound/server.js/` The main express back-end file, delegates requests to other files in routes
* `nodesound/server/models/Audio.js` Database model
* `nodesound/server/models/routes` Handling all the back-end requests
* `nodesound/server/models/serverfiles` The files that has been uploaded by the users are stored here
* `nodesound/server/models/blacklist.js` The IP-blacklist, compares when the user last voted


Clientside, front-end can be found here
* `nodesound/client/src/` Contains the structure for the rest of the front-end
* `nodesound/client/__tests__` The autoamted tests
* `nodesound/client/components` The React components used on the site

There are some audio files that I used when I tested my application included, you are free to use these, they can be found at
`/nodesound/files`.

These files were publicly available to download from [freesound.org](https://freesound.org/)