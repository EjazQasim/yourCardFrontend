import React, { useState } from 'react'
import { Grid, Card, CardContent, IconButton, Tab, Theme, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { FaChevronLeft } from 'react-icons/fa6'
import { TabList, TabPanel, TabContext } from '@mui/lab'

import InviteTab from '../components/InviteTab'
import AddUserTab from '../components/AddUserTab'

const AddMembersPage = () => {
  const router = useRouter()

  const [tabValue, setTabValue] = useState('invite')

  const handleTabsChange = (_event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue)
  }

  return (
    <Grid container spacing={6}>
      <Grid item container alignItems='center'>
        <Grid item>
          <IconButton
            onClick={() => {
              router.push('/home')
            }}
          >
            <FaChevronLeft />
          </IconButton>
        </Grid>
        <Grid item>
          <Typography variant='h5' component='h1'>
            Add Members
          </Typography>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <TabContext value={tabValue}>
              <div style={{ display: 'flex' }}>
                <TabList
                  orientation='vertical'
                  onChange={handleTabsChange}
                  sx={{
                    minWidth: '200px',
                    borderRight: (theme: Theme) => `1px solid ${theme.palette.divider}`
                  }}
                >
                  <Tab value='invite' label='Add by Email' />
                  <Tab value='user' label='Create new User' />
                </TabList>
                <div
                  style={{
                    flexGrow: 1
                  }}
                >
                  <TabPanel value='invite'>
                    <InviteTab />
                  </TabPanel>
                  <TabPanel value='user'>
                    <AddUserTab />
                  </TabPanel>
                </div>
              </div>
            </TabContext>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default AddMembersPage
