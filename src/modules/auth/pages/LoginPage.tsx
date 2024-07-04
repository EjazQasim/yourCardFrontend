import { useState, ReactNode } from 'react'
import Link from 'next/link'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import FormControlLabel from '@mui/material/FormControlLabel'
import Stack from '@mui/material/Stack'
import useMediaQuery from '@mui/material/useMediaQuery'
import { styled, useTheme } from '@mui/material/styles'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import toast from 'react-hot-toast'
import { useAuth } from 'src/hooks/useAuth'
import { useSettings } from 'src/@core/hooks/useSettings'
import themeConfig from 'src/configs/themeConfig'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import Spinner from '@components/common/Spinner'
import InputField from '@components/form/InputField'
import { passwordRegex } from 'src/@core/utils/regexUtils'
import { passwordErrorMessage } from 'src/@core/utils/errorMessages'

interface FormData {
  email: string
  password: string
}

const schema = yup.object().shape({
  email: yup.string().required('Email is a required').email('Email must be a valid email'),
  password: yup.string().required('Password is a required').matches(passwordRegex, passwordErrorMessage)
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

const LoginPage = () => {
  const auth = useAuth()
  const theme = useTheme()
  const { settings } = useSettings()
  const hidden = useMediaQuery(theme.breakpoints.down('md'))

  const [rememberMe, setRememberMe] = useState<boolean>(true)

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(schema)
  })

  const onSubmit = async (data: FormData) => {
    try {
      await auth.login(data)
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
                  {`Welcome to ${themeConfig.templateName}! 👋🏻`}
                </Typography>
                <Typography variant='body2' sx={{ mb: 5 }}>
                  Please sign-in to your account and start the adventure
                </Typography>
                <InputField control={control} name='email' label='Email' errors={errors} />
                <InputField control={control} name='password' label='Password' type='password' errors={errors} />
                <Stack direction='row' alignItems='center' justifyContent='space-between'>
                  <FormControlLabel
                    label='Remember Me'
                    control={<Checkbox checked={rememberMe} onChange={e => setRememberMe(e.target.checked)} />}
                  />
                  <Typography
                    variant='body2'
                    component={Link}
                    href='/auth/forgot-password'
                    sx={{ color: 'primary.main', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
                  >
                    Forgot Password?
                  </Typography>
                </Stack>
                <Button fullWidth size='large' type='submit' variant='contained' disabled={auth.loading}>
                  {auth.loading ? <Spinner /> : 'Login'}
                </Button>
                <Stack direction='row' alignItems='center' justifyContent='center' gap={2}>
                  <Typography sx={{ color: 'text.secondary' }}>New on our platform?</Typography>
                  <Typography
                    href='/auth/register'
                    component={Link}
                    sx={{ color: 'primary.main', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
                  >
                    Create an account
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

LoginPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>
LoginPage.guestGuard = true

export default LoginPage
