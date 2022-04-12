import express from 'express'
import { IssuesController } from '../controllers/issues-controller.js'
export const router = express.Router()

const issuesController = new IssuesController()

router.get('/', issuesController.getIndex)
router.post('/update', issuesController.postUpdateIssueState)
