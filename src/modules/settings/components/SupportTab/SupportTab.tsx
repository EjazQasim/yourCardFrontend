import { Grid, Button } from '@mui/material'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import InputField from '@components/form/InputField'

const schema = yup.object().shape({
  subject: yup.string().required(),
  message: yup.string().required()
})

const SupportTab = () => {
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  const onSubmit = async () => {
    try {
      // const res = await OtherService.sendEmail(data)
      toast.success('res.data.message')
      reset({
        subject: '',
        message: ''
      })
    } catch (error) {
      console.error('Email sending failed:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <strong>To</strong>
          <br />
          support@yourcard.au
        </Grid>
        <Grid item xs={12} sx={{ marginTop: '10px' }}>
          <InputField name='subject' label='Subject' control={control} errors={errors} />
        </Grid>
        <Grid item xs={12}>
          <InputField control={control} name='message' label='Message' multiline errors={errors} />
        </Grid>
        <Grid item xs={12}>
          <Button type='submit' variant='contained' size='large'>
            Send
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}

export default SupportTab
