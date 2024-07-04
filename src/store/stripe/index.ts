import { STRIPE_URL } from 'src/configs/constants'
import { apiSlice } from '../api'

export const stripeSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    createCheckoutSession: builder.mutation({
      query: ({ body }) => ({
        url: `${STRIPE_URL}/create-checkout-session`,
        method: 'POST',
        body
      })
    })
  })
})

export const { useCreateCheckoutSessionMutation } = stripeSlice
