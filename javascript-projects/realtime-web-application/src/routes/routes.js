import express from 'express'
import { router as issuesRouter } from './issues-router.js'
import { router as hookRouter } from './hook-router.js'
import config from '../config/config.js'

export const router = express.Router()

router.use(config.BASE_URL, issuesRouter)
router.use(`${config.BASE_URL}hook`, hookRouter)

// Invalid URL
router.use('*', (req, res, next) => {
  res.status(404)
  res.send('404 not found')
})
