export interface Response<T> {
  results?: T[]
  details?: T
  success?: boolean
  loading?: boolean
  message?: string
  totalResults?: number
  contact?: boolean
}
