/* eslint-disable @typescript-eslint/no-explicit-any */
import { IErrorGenericResponseInterface } from '../interfaces/errorGenericResponseInterface'
import { IErrorInterface } from '../interfaces/errorInterface'

export const validationError = (
  err: any,
): IErrorGenericResponseInterface => {
  const errors: IErrorInterface[] = Object.values(err.errors).map((el: any) => {
    return {
      path: el.path,
      message: el.message,
    }
  })

  return {
    statusCode: 400,
    message: 'Validation Error!',
    errorMessage: errors,
  }
}
