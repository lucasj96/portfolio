// Router delegating requests to other routers.
import express from 'express'
import { router as crudRouter } from './user-router.js'
import { router as snippetRouter } from './snippet-router.js'
import createError from 'http-errors'
import config from '../config/config.js'

export const router = express.Router()

router.use(config.BASE_HREF, crudRouter)
router.use(`${config.BASE_HREF}snippets/`, snippetRouter)

router.use('*', (req, res, next) => { next(createError(404, 'Error 404, resource not found.')) })
