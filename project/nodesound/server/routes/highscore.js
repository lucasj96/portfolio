const express = require('express')
const env = require('dotenv').config()
const router = express.Router()
const fs = require('fs') 
const Audiodb = require('../models/Audio')
const path = require('path')

router.get('/gettoplist', async (req, res) => {
  console.log('get highscore')
  Audiodb.find()
    .sort({ rating: -1 })
    .then(items => res.json(items))
})

router.get('/', async (req, res) => {
  console.log('get /submit')
  res.sendFile(path.join('C:\\git\\project\\nodesound\\', 'client', 'build', 'index.html'))
})

module.exports = router
