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
import { useAuth } from 'src/hooks/useAuth'
import { useSettings } from 'src/@core/hooks/useSettings'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import Spinner from '@components/common/Spinner'
import InputField from '@components/form/InputField'
import CustomCheckbox from '@components/others/custom-checkbox'
import { passwordRegex, usernameRegex } from 'src/@core/utils/regexUtils'
import { passwordErrorMessage, usernameErrorMessage } from 'src/@core/utils/errorMessages'

interface FormData {
  username: string
  email: string
  password: string
  confirmPassword: string
  terms: boolean
}

const schema = yup.object().shape({
  username: yup.string().required('Username is a required').matches(usernameRegex, usernameErrorMessage),
  email: yup.string().required('Email is a required').email('Email must be a valid email'),
  password: yup.string().required('Password is a required').matches(passwordRegex, passwordErrorMessage),
  confirmPassword: yup
    .string()
    .required('Confirm password is a required')
    .oneOf([yup.ref('password')], 'Passwords must match'),
  terms: yup
    .bool()
    .required('You must accept the terms & privacy policy')
    .oneOf([true], 'You must accept the terms & privacy policy')
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

const RegisterPage = () => {
  const auth = useAuth()
  const theme = useTheme()
  const { settings } = useSettings()
  const hidden = useMediaQuery(theme.breakpoints.down('md'))

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(schema)
  })

  const onSubmit = async (data: FormData) => {
    try {
      await auth.register({ username: data.username, email: data.email, password: data.password })
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
                  Adventure starts here 🚀
                </Typography>
                <Typography variant='body2' sx={{ mb: 5 }}>
                  Make your app management easy and fun!
                </Typography>
                <InputField control={control} name='username' label='Username' errors={errors} />
                <InputField control={control} name='email' label='Email' errors={errors} />
                <InputField control={control} name='password' label='Password' type='password' errors={errors} />
                <InputField
                  control={control}
                  name='confirmPassword'
                  label='Confirm Password'
                  type='password'
                  errors={errors}
                />
                <CustomCheckbox
                  name='terms'
                  label={
                    <Typography variant='body2' component='span' sx={{ color: errors.terms ? 'error.main' : '' }}>
                      I agree to{' '}
                      <Typography
                        sx={{ color: 'primary.main', textDecoration: 'none' }}
                        component={Link}
                        href='https://yourcard.au/terms-and-conditions/'
                      >
                        Terms
                      </Typography>
                      {' & '}
                      <Typography
                        sx={{ color: 'primary.main', textDecoration: 'none' }}
                        component={Link}
                        href='https://yourcard.au/privacy-policy/'
                      >
                        Privacy
                      </Typography>
                    </Typography>
                  }
                  control={control}
                  error={errors.terms}
                />
                <Button fullWidth size='large' type='submit' variant='contained' disabled={auth.loading}>
                  {auth.loading ? <Spinner /> : 'Register'}
                </Button>
                <Stack direction='row' alignItems='center' justifyContent='center' gap={2}>
                  <Typography sx={{ color: 'text.secondary' }}>Already have an account?</Typography>
                  <Typography
                    href='/auth/login'
                    component={Link}
                    sx={{ color: 'primary.main', textDecoration: 'none' }}
                  >
                    Sign in instead
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

RegisterPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>
RegisterPage.guestGuard = true

export default RegisterPage
