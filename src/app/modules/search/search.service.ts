import httpStatus from 'http-status'
import ApiError from '../../../Errors/apiError'
import { lessonCollection } from '../../../server'
import { ILesson } from '../lesson/lesson.interface'

// create a search functionality for the search
const getLessonBasedOnSearchParam = async (
  searchParam: string,
): Promise<ILesson[] | null> => {
  const query = {
    $or: [
      { topic: { $regex: searchParam, $options: 'i' } },
      { location: { $regex: searchParam, $options: 'i' } },
      { price: parseFloat(searchParam) || 0 },
      { space: parseInt(searchParam) || 0 },
    ],
  }

  try {
    const result = await lessonCollection.find(query).toArray()
    return result
  } catch (error) {
    // Handle errors appropriately
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Failed to get lessons based on search parameter',
    )
  }
}

export const searchService = {
  getLessonBasedOnSearchParam,
}
