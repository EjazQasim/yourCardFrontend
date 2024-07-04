import React, { useState, ReactNode } from 'react'
import { useRouter } from 'next/router'
import { Button, Box, useMediaQuery, Typography, Stack } from '@mui/material'
import { styled, useTheme } from '@mui/material/styles'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { useAuth } from 'src/hooks/useAuth'
import { useSettings } from 'src/@core/hooks/useSettings'
import Spinner from '@components/common/Spinner'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import { useUpdateProfileMutation } from '@store/profile'
import ProfilePreviewCard from '@modules/shared/ProfilePreviewCard'
import toast from 'react-hot-toast'
import InputField from '@components/form/InputField'
import ImagePicker from '@components/media/ImagePicker'

const RightWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.up('md')]: {
    maxWidth: 400
  },
  [theme.breakpoints.up('lg')]: {
    maxWidth: 450
  }
}))

const schema = yup.object().shape({
  name: yup.string().required().trim().min(1).max(35),
  jobTitle: yup.string().max(35),
  company: yup.string().max(35)
})

const RegisterStepsPage = () => {
  const { user } = useAuth()
  const theme = useTheme()
  const router = useRouter()
  const { settings } = useSettings()
  const hidden = useMediaQuery(theme.breakpoints.down('md'))

  const [activeStep, setActiveStep] = useState(0)
  const [image, setImage] = useState<any>()
  const [updateProfile, { isLoading }] = useUpdateProfileMutation()

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm({
    resolver: yupResolver(schema)
  })

  const watchedValues = watch()

  const onSubmit = async (values: any) => {
    const data = activeStep === 0 ? { name: values.name } : { company: values.company, jobTitle: values.jobTitle }
    try {
      await updateProfile({ id: user.live.id, body: { ...data, image } }).unwrap()
      if (activeStep === 2) {
        router.push('/')
      } else {
        setActiveStep(prevActiveStep => prevActiveStep + 1)
      }
    } catch (error: any) {
      toast.error(error?.data?.message || error.error)
    }
  }

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1)
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
            {!hidden && (
              <Box
                sx={{
                  top: 250,
                  left: 350,
                  position: 'absolute'
                }}
              >
                <ProfilePreviewCard profile={{ ...user.live, ...watchedValues }} image={image} />
              </Box>
            )}
            <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
              <Stack gap={2}>
                <Typography>Step {activeStep + 1}</Typography>
                <Typography variant='h5' sx={{ fontWeight: 600, letterSpacing: '0.18px' }}>
                  Create a profile
                </Typography>
                <Typography variant='body2' sx={{ mb: 5 }}>
                  Enter the details you would like displayed
                </Typography>
                {activeStep === 0 && <InputField name='name' label='Name' control={control} errors={errors} />}
                {activeStep === 1 && (
                  <>
                    <InputField name='jobTitle' label='Job Title' control={control} errors={errors} />
                    <InputField name='company' label='Company' control={control} errors={errors} />
                  </>
                )}
                {activeStep === 2 && (
                  <ImagePicker id='image' label='Profile picture' image={image} setImage={setImage} />
                )}
                <Stack direction='row' alignItems='center' justifyContent='space-between'>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} size='large' variant='text'>
                      Back
                    </Button>
                  )}
                  <Button disabled={isLoading} size='large' type='submit' variant='contained'>
                    {isLoading ? <Spinner /> : 'Continue'}
                  </Button>
                </Stack>
              </Stack>
            </form>
          </Box>
        </Box>
      </RightWrapper>
    </Box>
  )
}

RegisterStepsPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default RegisterStepsPage
