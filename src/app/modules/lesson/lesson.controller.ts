import { RequestHandler } from "express"
import { TryCatchHandler } from "../../../shared/tryCatchHandler"
import { ILesson } from "./lesson.interface"
import { ApiResponse } from "../../../shared/apiResponse"
import { lessonService } from "./lesson.service"


// create a new lesson
const createNewLesson: RequestHandler = TryCatchHandler(async (req, res) => {
  const lesson = req.body
  const result = await lessonService.createLesson(lesson)
  ApiResponse<ILesson>(res, {
    statusCode: 200,
    success: true,
    message: 'Lesson Created Successfully',
    body: result,
  })
})

// get all lessons from the database
const getAllLessons: RequestHandler = TryCatchHandler(async (req, res) => {
  const result = await lessonService.getAllLessons()
  ApiResponse<ILesson[]>(res, {
    statusCode: 200,
    success: true,
    message: 'Lesson Retrieved Successfully',
    body: result,
  })
})

// get single lesson from the lesson collection

const getSingleLesson: RequestHandler = TryCatchHandler(async (req, res) => {
  const lessonId = req.params.lessonId
  const result = await lessonService.getSingleLesson(lessonId)
  ApiResponse<ILesson>(res, {
    statusCode: 200,
    success: true,
    message: 'Lesson Retrieved Successfully',
    body: result,
  })
})


// update a lesson from the lesson collection

const updateLesson: RequestHandler = TryCatchHandler(async (req, res) => {
  const lessonId = req.params.lessonId

  const lesson = req.body

  const result = await lessonService.updateLesson(lessonId, lesson)
  ApiResponse<ILesson | null>(res, {
    statusCode: 200,
    success: true,
    message: 'Lesson Updated Successfully',
    body: result,
  })
})



// delete a lesson from the lesson collection

const deleteLesson: RequestHandler = TryCatchHandler(async (req, res) => {
  const lessonId = req.params.lessonId
  const result = await lessonService.deleteLesson(lessonId)
  ApiResponse<ILesson>(res, {
    statusCode: 200,
    success: true,
    message: 'Lesson Deleted Successfully',
    body: result,
  })
})

export const lessonController = {
    createNewLesson,
    getAllLessons,
    getSingleLesson,
    updateLesson,
    deleteLesson,
}

