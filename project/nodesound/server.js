// Used packages
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const fileUpload = require('express-fileupload')
const path = require('path')
// Routes
const audiodbUpload = require('./server/routes/postaudio')
const audiodbSubmittedAudio = require('./server/routes/submittedAudio')
const topList = require('./server/routes/highscore')
const requestIp = require('request-ip')
const app = express()
const port = 5000

app.use(express.json())
app.use(cors())
app.use(requestIp.mw())
app.use(fileUpload())
app.use(express.static(path.join(__dirname, '/client/build')))

const db = process.env.DATABASE_URL

mongoose
  .connect(db, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));


app.use('/upload/', audiodbUpload)


app.use('/submittedaudio', audiodbSubmittedAudio)

app.use('/toplist', topList)

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
})

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
})

app.listen(port, () => console.log(`Server.js listening at http://78.70.175.39:${port}`))
