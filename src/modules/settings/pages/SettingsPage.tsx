import React, { useState } from 'react'
import { Grid, Card, CardContent, Divider, Typography, Tab } from '@mui/material'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { useAuth } from 'src/hooks/useAuth'
import Alert from '@components/common/Alert'
import { FaRightFromBracket } from 'react-icons/fa6'
import toast from 'react-hot-toast'
import { useLazyLeaveTeamQuery } from '@store/team'
import AccountTab from '../components/AccountTab'
import SupportTab from '../components/SupportTab'
import SubscriptionTab from '../components/SubscriptionTab'
import UpdatePasswordTab from '../components/UpdatePasswodTab/UpdatePasswordTab'

const SettingsPage: React.FC = () => {
  const { logout, user, refetch }: any = useAuth()

  const [value, setValue] = useState('account')
  const [showLeaveTeamDialog, setShowLeaveTeamDialog] = useState(false)

  const [leaveTeam] = useLazyLeaveTeamQuery()

  const handleTabsChange = (event: React.SyntheticEvent, newValue: string) => {
    if (newValue === 'leave') {
      setShowLeaveTeamDialog(true)
    } else if (newValue === 'logout') {
      logout()
    } else {
      setValue(newValue)
    }
  }

  const handleLeaveTeam = async () => {
    try {
      await leaveTeam({})
      refetch()
      setShowLeaveTeamDialog(false)
      toast.success('Team left successfully')
    } catch (error: any) {
      toast.error(error?.data?.message || error.error)
    }
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h5' component='h1'>
          Settings
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <TabContext value={value}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={3}>
                  <TabList
                    orientation='vertical'
                    onChange={handleTabsChange}
                    sx={{
                      borderRight: (theme: any) => `1px solid ${theme.palette.divider}`,
                      flexGrow: 1
                    }}
                  >
                    <Tab value='account' label='Account' />
                    <Tab value='support' label='Support' />
                    <Tab value='updatePassword' label='Change password' />
                    {user?.team?.superAdmin === user?.id && <Tab value='mySubscription' label='My Subscription' />}
                    <Divider sx={{ margin: '20px' }} />
                    {user?.team && user?.team?.superAdmin !== user?.id && (
                      <Tab value='leave' label='Leave Team' sx={{ color: 'red' }} />
                    )}
                    <Tab
                      icon={<FaRightFromBracket />}
                      iconPosition='start'
                      sx={{ color: 'red' }}
                      value='logout'
                      label='Logout'
                    />
                  </TabList>
                </Grid>
                <Grid item xs={12} md={9}>
                  <div className='scroll'>
                    <TabPanel value='account'>
                      <AccountTab />
                    </TabPanel>
                    <TabPanel value='support'>
                      <SupportTab />
                    </TabPanel>
                    <TabPanel value='mySubscription'>
                      <SubscriptionTab />
                    </TabPanel>
                    <TabPanel value='updatePassword'>
                      <UpdatePasswordTab />
                    </TabPanel>
                  </div>
                </Grid>
              </Grid>
            </TabContext>
          </CardContent>
        </Card>
      </Grid>
      <Alert
        show={showLeaveTeamDialog}
        setShow={setShowLeaveTeamDialog}
        message={'Are you sure you want to leave this team?'}
        handleSuccess={handleLeaveTeam}
      />
    </Grid>
  )
}

export default SettingsPage
