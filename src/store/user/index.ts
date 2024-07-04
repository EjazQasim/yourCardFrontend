import { USERS_URL } from 'src/configs/constants'
import { apiSlice } from '../api'

export const userSlice = apiSlice.injectEndpoints({
  endpoints: (builder: any) => ({
    getUser: builder.query({
      query: (id: string) => ({
        url: `${USERS_URL}/${id}`
      }),
      keepUnusedDataFor: 5
    }),
    updateUser: builder.mutation({
      query: (data: any) => ({
        url: USERS_URL,
        method: 'PATCH',
        body: data
      }),
      invalidatesTags: ['User']
    }),
    exchangeContact: builder.mutation({
      query: ({ id, body }: any) => ({
        url: `${USERS_URL}/exchange-contact/${id}`,
        method: 'POST',
        body: body
      })
    }),
    exportLeads: builder.query({
      query: (id: any) => ({
        url: `${USERS_URL}/export-leads-csv/${id}`,
        responseHandler: 'text'
      })
    })
  })
})

export const { useGetUserQuery, useUpdateUserMutation, useExchangeContactMutation, useLazyExportLeadsQuery } = userSlice
