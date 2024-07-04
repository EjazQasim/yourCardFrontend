// StripeContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react'
import { loadStripe, Stripe, StripeError } from '@stripe/stripe-js'

// Replace 'your_stripe_public_key' with your actual Stripe public key
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY || '')

interface StripeContextProps {
  stripe: Stripe | null
  error: StripeError | null
}

const StripeContext = createContext<StripeContextProps>({
  stripe: null,
  error: null
})

export const useStripe = () => {
  return useContext(StripeContext)
}

interface StripeProviderProps {
  children: React.ReactNode
}

export const StripeProvider: React.FC<StripeProviderProps> = ({ children }) => {
  const [stripe, setStripe] = useState<Stripe | null>(null)
  const [error, setError] = useState<StripeError | null>(null)

  useEffect(() => {
    console.log('STRIPE')
    const initializeStripe = async () => {
      try {
        const stripeInstance = await stripePromise
        setStripe(stripeInstance)
      } catch (err) {
        console.log(err)
        setError(err as StripeError)
      }
    }

    initializeStripe()
  }, [])

  return <StripeContext.Provider value={{ stripe, error }}>{children}</StripeContext.Provider>
}
