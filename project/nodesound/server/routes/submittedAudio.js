const express = require('express')
const router = express.Router()
const Audiodb = require('../models/Audio')
const path = require('path')
const requestIp = require('request-ip')
const BlackList = require('../blacklist')

const blackList = new BlackList()

// use the ID to send audio file after analyzing the provided ID that is gathered from the url
router.get('/:id/getaudio', async (req, res) => {
  console.log('getAudio get audiofile')
  try {
    const items = await Audiodb.findById(req.params.id)
    if (!items) throw Error('No items')
    let filepath = items.name + '.' + items.format
    // res.status(200).json(items) // Combine this with res.sendFIle?
    res.sendFile(process.env.SERVERFILES_PATH + filepath)
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
})

router.get('/:id', async (req, res) => {
  res.sendFile(path.join('C:\\git\\project\\nodesound\\', 'client', 'build', 'index.html'))
})

router.get('/:id/getname', async (req, res) => {
  console.log('getname')
  const items = await Audiodb.findById(req.params.id)
  let name = items.customName
  res.json({ customName: name })
})

router.get('/:id/getrating', async (req, res) => {
  console.log('getrating')
  const items = await Audiodb.findById(req.params.id)
  let val = items.rating
  res.json({ rating: val })
})

const reqip = async (req, res, next) => {
  const clientIp = requestIp.getClientIp(req)
  req.clientIp = clientIp
  next()
}

router.patch('/:id', reqip, async (req, res) => {
  const items = await Audiodb.findById(req.params.id)
  let clientIp = req.clientIp
  // Check if the ip already is there

  // if (req.body.fetchTest) {
  //   blackList.removeIp(clientIp) // Can be commented out when not testing
  // }
  
    if (blackList.recentUsers[clientIp]) {
    console.log('IP exists, checking last vote from IP')
    let oneDayAgo = new Date().getTime() - (24 * 60 * 60 * 1000) // 24 Hours 
    if (oneDayAgo < blackList.recentUsers[clientIp]) {
      console.log('User voted less than a day ago since last vote')
      res.sendStatus(403)
      return
    } else {
      console.log('user can vote again, removed from blacklist and added again')
      blackList.removeIp(clientIp)
      blackList.addIp(clientIp)
    }
    
  } else {
    console.log('added IP to blacklist')
    blackList.addIp(req.clientIp)
  }
  if (req.body.increment) {
    items.rating += 1
  } else if (!req.body.increment) {
    items.rating -= 1
  } else {
  }
  items.save().then(() => console.log('Updated rating'))
  res.status(200).send()
})

module.exports = router

