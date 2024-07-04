import { AUTH_URL } from 'src/configs/constants'
import { apiSlice } from '../api'

export const userSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getMe: builder.query({
      query: () => ({
        url: `${AUTH_URL}/me`
      }),
      keepUnusedDataFor: 5
    }),
    login: builder.mutation({
      query(body) {
        return {
          url: `${AUTH_URL}/login`,
          method: 'POST',
          body
        }
      }
    }),
    register: builder.mutation({
      query(body) {
        return {
          url: `${AUTH_URL}/register`,
          method: 'POST',
          body
        }
      }
    }),
    forgotPassword: builder.mutation({
      query(body) {
        return {
          url: `${AUTH_URL}/forgot-password`,
          method: 'POST',
          body
        }
      }
    })
  })
})

export const { useGetMeQuery, useLoginMutation, useRegisterMutation, useForgotPasswordMutation } = userSlice
