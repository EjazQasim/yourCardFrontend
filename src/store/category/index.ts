import { CATEGORIES_URL } from 'src/configs/constants'
import { apiSlice } from '../api'

export const categorySlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getCategories: builder.query({
      query: () => ({
        url: CATEGORIES_URL
      }),
      keepUnusedDataFor: 5
    })
  })
})

export const { useGetCategoriesQuery } = categorySlice
