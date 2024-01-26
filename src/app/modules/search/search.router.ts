import express from 'express'
import { searchController } from './search.controller'

const router = express.Router()

//  router for get all lesson
router.get('/', searchController.getAllLessonBasedOnParams)

export const searchRouter = router
