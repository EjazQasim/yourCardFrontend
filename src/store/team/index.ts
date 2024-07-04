import { TEAMS_URL } from 'src/configs/constants'
import { apiSlice } from '../api'

const teamEndpoints = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getTeam: builder.query({
      query: id => ({
        url: `${TEAMS_URL}/${id}`
      })
    }),
    createTeam: builder.mutation({
      query: body => ({
        url: `${TEAMS_URL}`,
        method: 'POST',
        body
      })
    }),
    updateTeam: builder.mutation({
      query: ({ id, body }) => ({
        url: `${TEAMS_URL}/${id}`,
        method: 'PATCH',
        body
      })
    }),
    getMembers: builder.query({
      query: ({ teamId, ...params }) => ({
        url: `${TEAMS_URL}/${teamId}/team-members`,
        params
      })
    }),
    getTeamLeads: builder.query({
      query: ({ teamId, ...params }) => ({
        url: `${TEAMS_URL}/${teamId}/team-leads`,
        params
      }),
      providesTags: ['Team']
    }),
    inviteMembers: builder.mutation({
      query: ({ teamId, body }) => ({
        url: `${TEAMS_URL}/${teamId}/invite-members`,
        method: 'POST',
        body
      })
    }),
    createMember: builder.mutation({
      query: ({ teamId, body }) => ({
        url: `${TEAMS_URL}/${teamId}/create-member`,
        method: 'POST',
        body
      })
    }),
    removeMember: builder.mutation({
      query: ({ teamId, body }) => ({
        url: `${TEAMS_URL}/${teamId}/remove-member`,
        method: 'POST',
        body
      })
    }),
    updateMember: builder.mutation({
      query: ({ teamId, body }) => ({
        url: `${TEAMS_URL}/${teamId}/update-member`,
        method: 'POST',
        body
      })
    }),
    cancelPlan: builder.query({
      query: id => ({
        url: `${TEAMS_URL}/${id}/cancel-plan`
      })
    }),
    joinTeam: builder.query({
      query: () => ({
        url: `${TEAMS_URL}/join-team`
      })
    }),
    leaveTeam: builder.query({
      query: () => ({
        url: `${TEAMS_URL}/leave-team`
      })
    })
  })
})

export const {
  useGetTeamQuery,
  useCreateTeamMutation,
  useUpdateTeamMutation,
  useGetMembersQuery,
  useGetTeamLeadsQuery,
  useInviteMembersMutation,
  useCreateMemberMutation,
  useUpdateMemberMutation,
  useRemoveMemberMutation,
  useLazyCancelPlanQuery,
  useLazyJoinTeamQuery,
  useLazyLeaveTeamQuery
} = teamEndpoints
