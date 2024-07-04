import React from 'react'
import { Box, Button, Grid, Typography } from '@mui/material'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import toast from 'react-hot-toast'
import Spinner from '@components/common/Spinner'
import InputField from '@components/form/InputField'
import { useInviteMembersMutation } from '@store/team'
import { useAuth } from 'src/hooks/useAuth'

const InviteTab = () => {
  const { user } = useAuth()
  const [inviteMembers, { isLoading }] = useInviteMembersMutation()

  const schema = yup.object().shape({
    emails: yup.string()
  })

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  })

  const onSubmit = async (data: any) => {
    try {
      await inviteMembers({ teamId: user.team.id, body: data }).unwrap()
      toast.success('Team invite sent successfully.')
      reset()
    } catch (error: any) {
      toast.error(error?.data?.message || error.error)
    }
  }

  return (
    <Grid container spacing={2}>
      <Grid item container xs={12} md={7} lg={8}>
        <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ display: 'flex', alignItems: 'start', flexDirection: 'column' }} gap={4}>
            <Typography variant='h6'>Invite Teammates Add members to your team via email.</Typography>
            <Typography variant='body1'>
              If a Your Card user with that email already exists, the member will be pending until the user accepts the
              email invite.
            </Typography>
            <InputField
              control={control}
              name='emails'
              label='Emails'
              errors={errors}
              rows={3}
              multiline
              placeholder='Enter emails seperated by commas'
            />
            <Button size='large' type='submit' variant='contained' sx={{ mr: 3 }} disabled={isLoading}>
              {isLoading ? <Spinner /> : 'Add Teammates'}
            </Button>
          </Box>
        </form>
      </Grid>
      <Grid item xs={12} md={5} lg={4}></Grid>
    </Grid>
  )
}

export default InviteTab
