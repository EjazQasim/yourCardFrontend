import React from 'react'
import { Grid } from '@mui/material'
import { useAuth } from 'src/hooks/useAuth'
import EditUserForm from './EditUserForm'
import DeleteAccountCard from './DeleteAccountCard'

const AccountTab = () => {
  const { user }: any = useAuth()

  if (!user) {
    return <></>
  }

  return (
    <Grid container spacing={5}>
      <Grid item md={6}>
        <EditUserForm user={user} />
      </Grid>

      <Grid item md={6}>
        <DeleteAccountCard />
      </Grid>
    </Grid>
  )
}

export default AccountTab
