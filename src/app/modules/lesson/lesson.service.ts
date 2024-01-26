import httpStatus from 'http-status'
import { ObjectId } from 'mongodb'
import ApiError from '../../../Errors/apiError'
import { lessonCollection } from '../../../server'
import { ILesson } from './lesson.interface'

// create a new lesson
const createLesson = async (lesson: ILesson): Promise<ILesson | null> => {
  const result = await lessonCollection.insertOne(lesson)
  if (!result.acknowledged) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create lesson!')
  }

  const objectId = new ObjectId(result.insertedId)

  // Use the insertedId to find the created lesson
  const createdLesson = await lessonCollection.findOne({
    _id: objectId,
  })

  return createdLesson
}

// get all lesson from the database
const getAllLessons = async (): Promise<ILesson[] | null> => {
  const result = await lessonCollection.find().toArray()
  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to get all lessons!')
  }
  return result
}

// get single lesson from the lesson collection
const getSingleLesson = async (lessonId: string): Promise<ILesson | null> => {
  const objectId = new ObjectId(lessonId)

  const result = await lessonCollection.findOne({ _id: objectId })
  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to get lesson!')
  }
  return result
}

// update a lesson from the lesson collection
const updateLesson = async (
  lessonId: string,
  lesson: ILesson,
): Promise<ILesson | null> => {
  const objectId = new ObjectId(lessonId)

  const result = await lessonCollection.findOneAndUpdate(
    { _id: objectId },
    { $set: lesson },
    { returnDocument: 'after' },
  )
  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to update lesson!')
  }
  return result
}

// delete a lesson from the lesson collection
const deleteLesson = async (lessonId: string): Promise<ILesson | null> => {
  const objectId = new ObjectId(lessonId)

  const result = await lessonCollection.findOneAndDelete({ _id: objectId })
  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to delete lesson!')
  }
  return result
}

export const lessonService = {
  createLesson,
  getAllLessons,
  getSingleLesson,
  updateLesson,
  deleteLesson,
}
