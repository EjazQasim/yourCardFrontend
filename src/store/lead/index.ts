import { LEADS_URL } from 'src/configs/constants'
import { apiSlice } from '../api'
import { toFormData } from 'axios'

export const leadSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getMyLeads: builder.query({
      query: params => ({
        url: `${LEADS_URL}/my-leads`,
        params
      }),
      keepUnusedDataFor: 5,
      providesTags: ['Lead']
    }),
    getLead: builder.query({
      query: id => ({
        url: `${LEADS_URL}/${id}`
      }),
      keepUnusedDataFor: 5,
      providesTags: ['Lead']
    }),
    createLead: builder.mutation({
      query(body) {
        return {
          url: LEADS_URL,
          method: 'POST',
          body: toFormData(body)
        }
      },
      invalidatesTags: ['Lead']
    }),
    updateLead: builder.mutation({
      query: ({ id, body }) => ({
        url: `${LEADS_URL}/${id}`,
        method: 'PATCH',
        body: toFormData(body)
      }),
      invalidatesTags: ['Lead']
    }),
    deleteLead: builder.mutation({
      query: id => ({
        url: `${LEADS_URL}/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Lead', 'Team']
    }),
    getLeadContactCard: builder.query({
      query: (id: any) => ({
        url: `${LEADS_URL}/contact-card/${id}`,
        responseHandler: 'text'
      })
    })
  })
})

export const {
  useGetMyLeadsQuery,
  useGetLeadQuery,
  useCreateLeadMutation,
  useUpdateLeadMutation,
  useDeleteLeadMutation,
  useLazyGetLeadContactCardQuery
} = leadSlice
