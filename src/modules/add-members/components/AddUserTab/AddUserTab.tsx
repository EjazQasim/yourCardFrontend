import React from 'react'
import { Box, Button, Grid, Typography } from '@mui/material'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import toast from 'react-hot-toast'
import Spinner from '@components/common/Spinner'
import InputField from '@components/form/InputField'
import { useCreateMemberMutation } from '@store/team'
import { useAuth } from 'src/hooks/useAuth'

const AddUserTab = () => {
  const { user } = useAuth()
  const [createMember, { isLoading }] = useCreateMemberMutation()

  const schema = yup.object().shape({
    username: yup
      .string()
      .required()
      .matches(/^[a-zA-Z0-9_.-]*$/, 'invalid username'),
    email: yup.string().email().required(),
    password: yup.string().min(8).max(32).required(),
    confirmPassword: yup
      .string()
      .required('confirm password is a required field')
      .oneOf([yup.ref('password')], 'confirm password must match')
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
      await createMember({
        teamId: user.team.id,
        body: { email: data.email, username: data.username, password: data.password }
      }).unwrap()
      toast.success('User added to the team successfully.')
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
            <Typography variant='h6'>Add member to your team via creating new user.</Typography>
            <Typography variant='body1'>
              If a Your Card user with that email already exists, the member will be pending until the user accepts the
              email invite.
            </Typography>
            <InputField name='username' label='Username' control={control} errors={errors} />
            <InputField name='email' label='Email' control={control} errors={errors} />
            <InputField name='password' label='Password' type='password' control={control} errors={errors} />
            <InputField
              name='confirmPassword'
              label='Confirm Password'
              type='password'
              control={control}
              errors={errors}
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

export default AddUserTab
