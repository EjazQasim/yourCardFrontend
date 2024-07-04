import React from 'react'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import Spinner from '@components/common/Spinner'
import InputField from '@components/form/InputField'
import { useUpdateUserMutation } from '@store/user'

const schema = yup.object().shape({
  password: yup.string().required('password is required').matches(/^\S*$/, 'Space is not allowed in the password'),
  confirmPassword: yup
    .string()
    .required('confirm password is a required field')
    .oneOf([yup.ref('password')], 'confirm password must match')
})

const UpdatePasswordForm: React.FC<any> = () => {
  const [updateUser, { isLoading }] = useUpdateUserMutation()

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: { confirmPassword: '', password: '' },
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  const onSubmit = async (data: any) => {
    try {
      await updateUser({
        password: data.password
      }).unwrap()
      toast.success('password updated successfully')

      reset()
    } catch (err: any) {
      toast.error(err?.data?.message || err.error)
    }
  }

  return (
    <Card>
      <CardHeader title='Reset Password' />
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <InputField name='password' label='password' type={'password'} control={control} errors={errors} />
            </Grid>
            <Grid item xs={12}>
              <InputField
                name='confirmPassword'
                label='confirmPassword'
                type={'password'}
                control={control}
                errors={errors}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type='submit' variant='contained' disabled={isLoading}>
                {isLoading ? <Spinner /> : 'Reset Password'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default UpdatePasswordForm
