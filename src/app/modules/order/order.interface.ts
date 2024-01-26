import { ObjectId } from 'mongodb'
import { ILesson } from '../lesson/lesson.interface'

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export interface IOrder {
  name: string
  phoneNumber: string
  numberOfSpaces: number
  lessonIds: ObjectId[]
}

export type IOrderResponse = {
  name: string
  phoneNumber: string
  numberOfSpaces: number
  lessonIds: ILesson[]
}
