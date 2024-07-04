import { PROFILES_URL } from 'src/configs/constants'
import { apiSlice } from '../api'
import { toFormData } from 'axios'

export const profileSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getMyProfiles: builder.query({
      query: ({ keyword, pageNumber }) => ({
        url: `${PROFILES_URL}/my-profiles`,
        params: { keyword, pageNumber }
      }),
      keepUnusedDataFor: 5,
      providesTags: ['Profile']
    }),
    getProfile: builder.query({
      query: profileId => ({
        url: `${PROFILES_URL}/${profileId}`
      }),
      keepUnusedDataFor: 5,
      providesTags: ['Profile']
    }),
    createProfile: builder.mutation({
      query: body => ({
        url: `${PROFILES_URL}`,
        method: 'POST',
        body: toFormData(body)
      }),
      invalidatesTags: ['Profile']
    }),
    updateProfile: builder.mutation({
      query: ({ id, body }) => ({
        url: `${PROFILES_URL}/${id}`,
        method: 'PATCH',
        body: toFormData(body)
      }),
      invalidatesTags: ['Profile']
    }),
    deleteProfile: builder.mutation({
      query: profileId => ({
        url: `${PROFILES_URL}/${profileId}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Profile']
    }),
    getProfileContactCard: builder.query({
      query: (id: any) => ({
        url: `${PROFILES_URL}/contact-card/${id}`,
        responseHandler: 'text'
      })
    })
  })
})

export const {
  useGetMyProfilesQuery,
  useGetProfileQuery,
  useCreateProfileMutation,
  useUpdateProfileMutation,
  useDeleteProfileMutation,
  useLazyGetProfileContactCardQuery
} = profileSlice
