import React, { useState } from 'react'
import { Box, Typography, Button, CardContent, Grid, Card } from '@mui/material'
import { FaPlus, FaTrash } from 'react-icons/fa6'
import toast from 'react-hot-toast'
import Alert from '@components/common/Alert'
import { useAuth } from 'src/hooks/useAuth'
import { useLazyCancelPlanQuery } from '@store/team'

const MyPlanCard = ({ membersData }: any) => {
  const { user, refetch } = useAuth()
  const [showCancelPlanDialog, setShowCancelPlanDialog] = useState(false)

  const [cancelPlan] = useLazyCancelPlanQuery({})

  const handleCancelPlan = async () => {
    try {
      await cancelPlan(user?.team?.id)
      refetch()
      toast.success('Team plan canceled successfully')
    } catch (error: any) {
      toast.error(error?.data?.message || error.error)
    }
  }

  const calculateMonthlyPrice = (members: any) => {
    if (members) {
      if (members < 25) {
        return 4.99
      } else if (members < 100) {
        return 4.49
      } else if (members < 250) {
        return 3.99
      } else if (members < 1000) {
        return 3.49
      } else {
        return 2.99
      }
    }

    return 0
  }

  return (
    <>
      <Card>
        <CardContent>
          <Grid container spacing={5}>
            <Grid item xs={12} container justifyContent='space-between' alignItems='center'>
              <Typography>Teams</Typography>
              <Button
                variant='outlined'
                color='secondary'
                onClick={() => setShowCancelPlanDialog(true)}
                startIcon={<FaTrash />}
              >
                Cancel plan
              </Button>
            </Grid>
            <Grid item xs={12} container>
              <Grid item xs={4}>
                <Typography>
                  <strong>Team Members</strong>{' '}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '30px' }}>
                  <Typography variant='h4'>
                    <strong>{membersData?.totalResults}</strong>
                  </Typography>
                  <Button
                    variant='outlined'
                    color='secondary'
                    startIcon={<FaPlus />}
                    sx={{ marginLeft: '10px' }}
                    href={`/add-members/`}
                  >
                    Add Members
                  </Button>
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Typography>
                  <strong>Price Per member</strong>
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '30px' }}>
                  <Typography variant='h5'>
                    <strong>${calculateMonthlyPrice(membersData?.totalResults).toFixed(2)}</strong>
                    <Typography variant='inherit' component='span' sx={{ fontSize: 'small', marginLeft: '4px' }}>
                      /per month
                    </Typography>
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Typography>
                  <strong>Total</strong>
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '30px' }}>
                  <Typography variant='h5'>
                    <strong>
                      $
                      {(calculateMonthlyPrice(membersData?.totalResults) * (membersData?.totalResults || 0)).toFixed(2)}
                    </strong>
                    <Typography variant='inherit' component='span' sx={{ fontSize: 'small', marginLeft: '4px' }}>
                      /per month
                    </Typography>
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Alert
        show={showCancelPlanDialog}
        setShow={setShowCancelPlanDialog}
        message={'Are you sure you would like to cancel your plan?'}
        handleSuccess={handleCancelPlan}
      />
    </>
  )
}

export default MyPlanCard
