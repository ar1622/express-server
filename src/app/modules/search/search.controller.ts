import { RequestHandler } from 'express'
import { TryCatchHandler } from '../../../shared/tryCatchHandler'
import { ILesson } from '../lesson/lesson.interface'
import { searchService } from './search.service'
import { ApiResponse } from '../../../shared/apiResponse'
// import { searchField } from '../../../constants/searchField'
// import { Pick } from '../../../utils/pick'

const getAllLessonBasedOnParams: RequestHandler = TryCatchHandler(
  async (req, res) => {        

         const result = await searchService.getLessonBasedOnSearchParam(req.query.search as string)
         ApiResponse<ILesson[]>(res, {
           statusCode: 200,
           success: true,
           message: 'Lesson Retrieved Successfully',
           body: result,
         })
  },
)

export const searchController = {
  getAllLessonBasedOnParams,
}
