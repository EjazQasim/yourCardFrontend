import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react'
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { BASE_URL } from 'src/configs/constants'

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders(headers) {
    if (localStorage.getItem('tokens')) {
      const tokens = JSON.parse(localStorage.getItem('tokens') || '')
      if (tokens) {
        headers.set('Authorization', `Bearer ${tokens.access.token}`)
      }
    }

    return headers
  }
})

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  let result = await baseQuery(args, api, extraOptions)
  if (result.error && result.error.status === 401 && localStorage.getItem('tokens')) {
    const tokens = JSON.parse(localStorage.getItem('tokens') || '')
    const refreshToken = tokens.refresh.token || ''

    const refreshResult: any = await baseQuery(
      {
        url: '/v1/auth/refresh-tokens',
        method: 'POST',
        body: { refreshToken }
      },
      api,
      extraOptions
    )

    if (refreshResult.data) {
      localStorage.setItem('tokens', JSON.stringify(refreshResult.data.tokens))
      result = await baseQuery(args, api, extraOptions)
    } else {
      localStorage.removeItem('tokens')
      localStorage.removeItem('user')
    }
  }

  return result
}

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ['User', 'Profile', 'Link', 'Product', 'Category', 'Tag', 'Team', 'Lead'],
  endpoints: () => ({})
})
