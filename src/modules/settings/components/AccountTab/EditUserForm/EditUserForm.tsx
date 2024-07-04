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
import { useUpdateUserMutation } from 'src/store/user'
import Spinner from '@components/common/Spinner'
import { User } from 'src/@core/types'
import InputField from '@components/form/InputField'
import { useAuth } from 'src/hooks/useAuth'

interface EditUserFormProps {
  user: User
}

const schema = yup.object().shape({
  username: yup.string().required('Username is required').matches(/^\S*$/, 'Space is not allowed in the username'),
  email: yup.string().email().required()
})

const EditUserForm: React.FC<EditUserFormProps> = ({ user }) => {
  const [updateUser, { isLoading }] = useUpdateUserMutation()
  const { refetch }: any = useAuth()

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: { email: user.email, username: user.username },
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  const onSubmit = async (data: any) => {
    try {
      await updateUser(data).unwrap()
      toast.success('User updated successfully')
      refetch()
    } catch (error: any) {
      toast.error(error?.data?.message || error.error)
    }
  }

  const handleCancel = () => {
    reset(user)
  }

  return (
    <Card>
      <CardHeader title='Account Details' />
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <InputField name='username' label='Username' control={control} errors={errors} />
            </Grid>
            <Grid item xs={12}>
              <InputField name='email' label='Email' control={control} errors={errors} />
            </Grid>
            <Grid item xs={12}>
              <Button variant='outlined' color='secondary' onClick={handleCancel}>
                Cancel
              </Button>
              <Button type='submit' variant='contained' sx={{ ml: 3 }} disabled={isLoading}>
                {isLoading ? <Spinner /> : 'Save'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default EditUserForm
