// Router delegating requests to user control.
import express from 'express'
import { UserController } from '../controllers/user-controller.js'
export const router = express.Router()

const controller = new UserController()

router.get('/', controller.getIndex)
router.get('/login', controller.getLogin)
router.post('/login', controller.postLogin)
router.get('/register', controller.getRegister)
router.post('/register', controller.postRegister)
router.get('/logout', controller.getLogout)
