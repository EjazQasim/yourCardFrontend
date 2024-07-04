import React from 'react'
import { Grid } from '@mui/material'
import { useAuth } from 'src/hooks/useAuth'
import UpdatePasswordForm from './UpdatePasswordForm'

const UpdatePasswordTab = () => {
  const { user }: any = useAuth()

  if (!user) {
    return <></>
  }

  return (
    <Grid container spacing={5}>
      <Grid item md={6}>
        <UpdatePasswordForm />
      </Grid>
    </Grid>
  )
}

export default UpdatePasswordTab
