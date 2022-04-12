import express from 'express'
import { verifySecretToken } from '../functions/middleware.js'
import { HookController } from '../controllers/hook-controller.js'
export const router = express.Router()

const hookController = new HookController()

router.post('/', verifySecretToken, hookController.postWebhookIssue)
