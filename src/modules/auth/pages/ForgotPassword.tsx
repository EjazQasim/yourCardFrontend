import { ReactNode } from 'react'
import Link from 'next/link'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import useMediaQuery from '@mui/material/useMediaQuery'
import { styled, useTheme } from '@mui/material/styles'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import toast from 'react-hot-toast'
import { useSettings } from 'src/@core/hooks/useSettings'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import Spinner from '@components/common/Spinner'
import InputField from '@components/form/InputField'
import { useForgotPasswordMutation } from '@store/auth'

interface FormData {
  email: string
}

const schema = yup.object().shape({
  email: yup.string().required('Email is a required').email('Email must be a valid email')
})

const RightWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.up('md')]: {
    maxWidth: 400
  },
  [theme.breakpoints.up('lg')]: {
    maxWidth: 450
  }
}))

const ForgotPasswordPage = () => {
  const theme = useTheme()
  const { settings } = useSettings()
  const hidden = useMediaQuery(theme.breakpoints.down('md'))

  const [forgotPassword, { isLoading }] = useForgotPasswordMutation()

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(schema)
  })

  const onSubmit = async (data: FormData) => {
    try {
      await forgotPassword(data).unwrap()
      toast.success('Email sent. Please check your inbox for password reset instructions.')
      reset({ email: '' })
    } catch (error: any) {
      toast.error(error?.data?.message || error.error)
    }
  }

  return (
    <Box className='content-right'>
      {!hidden && (
        <Box sx={{ flex: 1, display: 'flex', position: 'relative', alignItems: 'center', justifyContent: 'center' }} />
      )}
      <RightWrapper
        sx={settings.skin === 'bordered' && !hidden ? { borderLeft: `1px solid ${theme.palette.divider}` } : {}}
      >
        <Box
          sx={{
            p: 7,
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'background.paper'
          }}
        >
          <Box
            sx={{
              width: '100%',
              [theme.breakpoints.down('md')]: {
                maxWidth: 400
              }
            }}
          >
            <Box
              sx={{
                top: 30,
                left: 40,
                display: 'flex',
                position: 'absolute',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <img height={120} width={120} src='/images/logo-dark.png' alt='logo' />
            </Box>
            <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
              <Stack gap={2}>
                <Typography variant='h5' sx={{ fontWeight: 600, letterSpacing: '0.18px' }}>
                  Forgot Password? 🔒
                </Typography>
                <Typography variant='body2' sx={{ mb: 5 }}>
                  Enter your email and we'll send you instructions to reset your password.
                </Typography>
                <InputField control={control} name='email' label='Email' errors={errors} />
                <Button fullWidth size='large' type='submit' variant='contained' disabled={isLoading}>
                  {isLoading ? <Spinner /> : 'Send reset link'}
                </Button>
                <Stack direction='row' alignItems='center' justifyContent='center' gap={2}>
                  <Typography
                    href='/auth/login'
                    component={Link}
                    sx={{ color: 'primary.main', textDecoration: 'none' }}
                  >
                    Back to login?
                  </Typography>
                </Stack>
              </Stack>
            </form>
          </Box>
        </Box>
      </RightWrapper>
    </Box>
  )
}

ForgotPasswordPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>
ForgotPasswordPage.guestGuard = true

export default ForgotPasswordPage
