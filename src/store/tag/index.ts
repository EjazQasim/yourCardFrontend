import { TAGS_URL } from 'src/configs/constants'
import { apiSlice } from '../api'
import { Response, Tag } from 'src/@core/types'

export const tagSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getTags: builder.query<Response<Tag>, { user: string; page?: number; limit?: number }>({
      query: params => ({
        url: `${TAGS_URL}`,
        params
      }),
      keepUnusedDataFor: 5,
      providesTags: ['Tag']
    }),
    getTag: builder.query({
      query: tagId => ({
        url: `${TAGS_URL}/${tagId}`
      }),
      keepUnusedDataFor: 5
    }),
    createTag: builder.mutation({
      query: () => ({
        url: `${TAGS_URL}`,
        method: 'POST'
      }),
      invalidatesTags: ['Tag']
    }),
    updateTag: builder.mutation({
      query: ({ id, body }) => ({
        url: `${TAGS_URL}/${id}`,
        method: 'PATCH',
        body
      }),
      invalidatesTags: ['Tag']
    }),
    deleteTag: builder.mutation({
      query: tagId => ({
        url: `${TAGS_URL}/${tagId}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Tag']
    }),
    linkTag: builder.query({
      query: tagId => ({
        url: `${TAGS_URL}/link/${tagId}`
      })
    }),
    unLinkTag: builder.query({
      query: tagId => ({
        url: `${TAGS_URL}/unlink/${tagId}`
      })
    })
  })
})

export const {
  useGetTagsQuery,
  useGetTagQuery,
  useCreateTagMutation,
  useUpdateTagMutation,
  useDeleteTagMutation,
  useLazyLinkTagQuery,
  useLazyUnLinkTagQuery
} = tagSlice
