
export type ApiResponseType<T> = {
  statusCode: number
  success: boolean
  message?: string
  body: T | null
}
