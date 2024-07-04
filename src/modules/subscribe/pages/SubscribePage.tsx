import { ToggleButton, ToggleButtonGroup, Typography, Grid, IconButton } from '@mui/material'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from 'src/hooks/useAuth'
import toast from 'react-hot-toast'
import { useStripe } from 'src/context/StripeContext'
import PlanDetails from '@components/others/plan-details'
import { FaChevronLeft } from 'react-icons/fa6'
import { useCreateCheckoutSessionMutation } from '@store/stripe'
import { isNullOrEmpty } from 'src/@core/utils/miscUtils'

const SubscribePage: React.FC = () => {
  const router = useRouter()
  const { stripe } = useStripe()

  const { user } = useAuth()

  const [billingPeriod, setBillingPeriod] = useState<'annually' | 'monthly'>('annually')

  const [createCheckoutSession] = useCreateCheckoutSessionMutation()

  const handleBillingPeriodChange = (_: React.MouseEvent<HTMLElement>, newBillingPeriod: 'annually' | 'monthly') => {
    if (newBillingPeriod) {
      setBillingPeriod(newBillingPeriod)
    }
  }

  const handlePlanSelect = async (planId: string) => {
    if (!stripe) {
      toast.error("Stripe hasn't been initialized yet, handle this error as needed")

      return
    }

    try {
      const { sessionId }: any = await createCheckoutSession({ body: { planId, billingPeriod } }).unwrap()
      if (sessionId) {
        const { error } = await stripe.redirectToCheckout({
          sessionId
        })
        if (error) {
          toast.error(error.message || '')
        }
      } else {
        toast.error('Failed to create checkout session')
      }
    } catch (error: any) {
      toast.error(error.response.data.message)
    }
  }

  const plansData: any = [
    {
      id: '1',
      title: 'Your Card Teams',
      subtitle: 'For Organizations',
      planBenefits: [
        'Your Card Pro for all team members',
        'Bulk card & device management',
        'Team-wide analytics',
        'Manage contacts & export to CRM',
        'List Product or Services'
      ],
      imgSrc: '',
      currentPlan: !isNullOrEmpty(user?.team),
      popularPlan: false,
      monthlyPrice: 9.99,
      yearlyPlan: {
        perMonth: 6.99,
        totalAnnual: 83.88
      }
    }
  ]

  return (
    <Grid container spacing={6}>
      <Grid item container justifyContent='space-between' alignItems='center'>
        <IconButton
          onClick={() => {
            router.push('/home')
          }}
        >
          <FaChevronLeft />
        </IconButton>
        <Typography variant='h5' component='h1'>
          Choose a plan
        </Typography>
        <ToggleButtonGroup
          sx={{ marginLeft: 'auto' }}
          value={billingPeriod}
          exclusive
          color='primary'
          onChange={handleBillingPeriodChange}
        >
          <ToggleButton value='annually'>Yearly</ToggleButton>
          <ToggleButton value='monthly'>Monthly</ToggleButton>
        </ToggleButtonGroup>
      </Grid>
      <Grid item container spacing={6}>
        {plansData.map((data: any) => (
          <Grid item xs={12} md={4} key={data.title}>
            <PlanDetails billingPeriod={billingPeriod} data={data} onPlanSelect={handlePlanSelect} />
          </Grid>
        ))}
      </Grid>
    </Grid>
  )
}

export default SubscribePage
