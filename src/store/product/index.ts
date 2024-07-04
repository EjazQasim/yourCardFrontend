import { PRODUCTS_URL } from 'src/configs/constants'
import { apiSlice } from '../api'
import { toFormData } from 'axios'

export const productSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getProducts: builder.query({
      query: ({ profile, page, limit }) => ({
        url: PRODUCTS_URL,
        params: { profile, page, limit }
      }),
      keepUnusedDataFor: 5,
      providesTags: ['Product']
    }),
    getProduct: builder.query({
      query: id => ({
        url: `${PRODUCTS_URL}/${id}`
      }),
      keepUnusedDataFor: 5
    }),
    createProduct: builder.mutation({
      query(body) {
        return {
          url: PRODUCTS_URL,
          method: 'POST',
          body: toFormData(body)
        }
      },
      invalidatesTags: ['Product']
    }),
    updateProduct: builder.mutation({
      query: ({ id, body }) => ({
        url: `${PRODUCTS_URL}/${id}`,
        method: 'PATCH',
        body: toFormData(body)
      }),
      invalidatesTags: ['Product']
    }),
    deleteProduct: builder.mutation({
      query: id => ({
        url: `${PRODUCTS_URL}/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Product']
    }),
    reorderProducts: builder.mutation({
      query: ({ profileId, body }) => ({
        url: `${PRODUCTS_URL}/reorder/${profileId}`,
        method: 'PATCH',
        body
      }),
      invalidatesTags: ['Product']
    })
  })
})

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useReorderProductsMutation
} = productSlice
