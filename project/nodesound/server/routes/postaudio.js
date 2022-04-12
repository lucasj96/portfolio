const express = require('express')
const router = express.Router()
const fs = require('fs')

// Audio Model
const Audiodb = require('../models/Audio')

router.post('/', async (req, res) => {
  console.log('server post upload')

  let untakenFilename = req.files.inpFile.name
  let takenDirName = true

  let counter = 0
  while (takenDirName) {
    if (!fs.existsSync(__dirname + '\\..\\serverfiles\\' + untakenFilename + '.' + req.body.format)) {
      console.log('Suerver post upload Name not taken taken')
      takenDirName = false
    } else {
      console.log('Serer post upload Name taken')
      if (fs.existsSync(__dirname + '\\..\\serverfiles\\' + untakenFilename + counter + '.' + req.body.format)) {
        counter++
      } else {
        untakenFilename += counter
        takenDirName = false
      }
    }
  }

  // Database Properties
  const newAudiodb = new Audiodb({
    name: untakenFilename,
    rating: req.body.rating,
    format: req.body.format,
    customName: req.body.customName
  })
  // The ID associated with the database
  const id = newAudiodb.id
  await newAudiodb.save().then(() => console.log('Saved document'))

  let sampleFile = req.files.inpFile

  // Save to Serverfiles in root
  sampleFile.mv(__dirname + '\\..\\serverfiles\\' + untakenFilename + '.' + req.body.format, (err) => {
    if (err) {
      return res.status(500).send(err)
    }
    res.set('Access-Control-Expose-Headers', 'Location')
    res.setHeader('Location', '/submittedaudio/' + id)
    res.send(201)
    console.log('File uploaded')
  })
})

module.exports = router
