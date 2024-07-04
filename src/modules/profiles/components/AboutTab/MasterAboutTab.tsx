import React, { useState } from 'react'
import { Box, Button, Grid } from '@mui/material'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import toast from 'react-hot-toast'
import { useUpdateProfileMutation } from '@store/profile'
import Spinner from '@components/common/Spinner'
import ProfilePreviewCard from '@modules/shared/ProfilePreviewCard'
import ImagePicker from '@components/media/ImagePicker'
import InputField from '@components/form/InputField'
import ColorPicker from '@components/others/color-picker'

const MasterAboutTab = ({ profile, links, products }: any) => {
  const [cover, setCover] = useState(profile.cover)
  const [logo, setLogo] = useState(profile.logo)
  const [themeColor, setThemeColor] = useState(profile.themeColor)

  const [updateProfile, { isLoading }] = useUpdateProfileMutation()

  const schema = yup.object().shape({
    company: yup.string()
  })

  const defaultValues = {
    company: profile.company || ''
  }

  const formFields = [{ name: 'company', label: 'Company' }]

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema)
  })

  const onSubmit = async (data: any) => {
    try {
      await updateProfile({ id: profile.id, body: { ...data, cover, logo, themeColor } }).unwrap()
      toast.success('Profile updated successfully')
    } catch (error: any) {
      toast.error(error?.data?.message || error.error)
    }
  }

  const handleCancel = () => {
    reset(profile)
  }

  const watchedValues = watch()

  return (
    <Grid container spacing={2} xs={12}>
      <Grid item container xs={12} md={7} lg={8}>
        <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
          <Grid container xs={12} spacing={2}>
            <Grid item xs={12} md={4}>
              <ImagePicker id='cover' rectangle label='Cover photo' image={cover} setImage={setCover} />
            </Grid>
            <Grid item xs={12} md={4}>
              <ImagePicker id='logo' label='Company logo' image={logo} setImage={setLogo} />
            </Grid>
            <Grid item xs={12}>
              <ColorPicker label='Card Color' setValue={setThemeColor} />
            </Grid>
            {formFields.map((field: any) => (
              <Grid key={field.name} item xs={12} md={6}>
                <InputField {...field} control={control} errors={errors} />
              </Grid>
            ))}
          </Grid>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button size='large' type='submit' variant='contained' sx={{ mr: 3 }} disabled={isLoading}>
              {isLoading ? <Spinner /> : 'Update'}
            </Button>
            <Button size='large' variant='outlined' color='secondary' onClick={handleCancel}>
              Cancel
            </Button>
          </Box>
        </form>
      </Grid>
      <Grid item xs={12} md={5} lg={4}>
        <ProfilePreviewCard
          profile={{ ...profile, ...watchedValues, cover, logo, themeColor }}
          links={links}
          products={products}
        />
      </Grid>
    </Grid>
  )
}

export default MasterAboutTab
