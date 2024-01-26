import { IErrorGenericResponseInterface } from '../interfaces/errorGenericResponseInterface'
import { IErrorInterface } from '../interfaces/errorInterface'

export const castError = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any,
): IErrorGenericResponseInterface => {
  const errors: IErrorInterface[] = [
    {
      path: error.path,
      message: 'Invalid Id',
    },
  ]

  return {
    statusCode: 400,
    message: 'Cast Error!',
    errorMessage: errors,
  }
}
