import { User } from 'src/@core/types'

export type LoginParams = {
  email: string
  password: string
}

export type RegisterParams = {
  username: string
  email: string
  password: string
}

export type ForgotPasswordParams = {
  email: string
}

export type AuthValuesType = {
  loading: boolean
  logout: () => void
  initAuth: () => void
  user: User | null
  setLoading: (value: boolean) => void
  setUser: (value: User | null) => void
  login: (params: LoginParams, errorCallback?: any) => void
  register: (params: RegisterParams, errorCallback?: any) => void
  forgotPassword: (params: ForgotPasswordParams, successCallback?: any, errorCallback?: any) => void
  updateUser: (params: object) => void
}
