import React, { useState } from 'react'
import { Box, Button, Grid } from '@mui/material'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import toast from 'react-hot-toast'
import { useCreateProfileMutation, useDeleteProfileMutation, useUpdateProfileMutation } from '@store/profile'
import Spinner from '@components/common/Spinner'
import ProfilePreviewCard from '@modules/shared/ProfilePreviewCard'
import ImagePicker from '@components/media/ImagePicker'
import InputField from '@components/form/InputField'
import ColorPicker from '@components/others/color-picker'
import { useRouter } from 'next/router'
import { useAuth } from 'src/hooks/useAuth'

const AboutTab = ({ profile, links, products }: any) => {
  const router = useRouter()
  const { user } = useAuth()

  const [image, setImage] = useState(profile?.image)
  const [cover, setCover] = useState(profile?.cover)
  const [logo, setLogo] = useState(profile?.logo)
  const [themeColor, setThemeColor] = useState(profile?.themeColor)

  const [updateProfile, { isLoading }] = useUpdateProfileMutation()
  const [createProfile, { isLoading: createLoading }] = useCreateProfileMutation()
  const [deleteProfile, { isLoading: deleteLoading }] = useDeleteProfileMutation()

  const schema = yup.object().shape({
    title: yup.string().max(15),
    name: yup.string().required(),
    location: yup.string(),
    jobTitle: yup.string(),
    company: yup.string().max(255),
    bio: yup.string()
  })

  const defaultValues = {
    title: profile?.title || '',
    name: profile?.name || '',
    location: profile?.location || '',
    jobTitle: profile?.jobTitle || '',
    company: profile?.company || '',
    bio: profile?.bio || ''
  }

  const formFields = [
    { name: 'name', label: 'Name', capital: true },
    { name: 'location', label: 'Location', capital: true },
    { name: 'jobTitle', label: 'Job Title', capital: true },
    { name: 'company', label: 'Company', capital: true }
  ]

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
    if (profile) {
      try {
        await updateProfile({ id: profile.id, body: { ...data, image, cover, logo, themeColor } }).unwrap()
        toast.success('Profile updated successfully')
      } catch (error: any) {
        toast.error(error?.data?.message || error.error)
      }
    } else {
      try {
        const createdPorfile: any = await createProfile(data).unwrap()
        toast.success('Profile added successfully')
        router.push(`/profiles/${createdPorfile.id}`)
      } catch (error: any) {
        toast.error(error?.data?.message || error.error)
      }
    }
  }
  const handleCancel = () => {
    reset(profile)
  }
  const handleDelete = async () => {
    try {
      await deleteProfile(profile.id).unwrap()
      toast.success('Profile deleted successfully')

      await router.push('/home')
    } catch (error: any) {
      toast.error(error?.data?.message || error.error)
    }
  }
  const watchedValues = watch()

  return (
    <Grid container spacing={2}>
      <Grid item container xs={12} md={7} lg={8}>
        <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
          <Grid item container xs={12} spacing={2}>
            <Grid item xs={12} md={12}>
              <InputField name='title' label='Title' control={control} errors={errors} />
            </Grid>
            <Grid item xs={12} md={4}>
              <ImagePicker id='image' label='Profile picture' image={image} setImage={setImage} />
            </Grid>
            <Grid item xs={12} md={4}>
              <ImagePicker id='cover' rectangle label='Cover photo' image={cover} setImage={setCover} />
            </Grid>
            <Grid item xs={12} md={4}>
              <ImagePicker id='logo' label='Company logo' image={logo} setImage={setLogo} />
            </Grid>
            {(user?.team || user?.isPro) && (
              <Grid item xs={12}>
                <ColorPicker label='Custom Themes' setValue={setThemeColor} />
              </Grid>
            )}
            {formFields.map((field: any) => (
              <Grid key={field.name} item xs={12} md={6}>
                <InputField {...field} control={control} errors={errors} />
              </Grid>
            ))}
            <Grid item xs={12} md={12}>
              <InputField name='bio' label='Bio' multiline rows={2} control={control} errors={errors} />
            </Grid>
          </Grid>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button size='large' type='submit' variant='contained' sx={{ mr: 3 }} disabled={isLoading}>
              {isLoading || createLoading ? <Spinner /> : profile ? 'Update' : 'Add'}
            </Button>
            <Button size='large' variant='outlined' color='secondary' onClick={handleCancel}>
              Cancel
            </Button>
            {profile ? (
              <Button
                size='large'
                variant='outlined'
                color='error'
                sx={{ ml: 3 }}
                onClick={handleDelete}
                disabled={deleteLoading}
              >
                Delete
              </Button>
            ) : (
              ''
            )}
          </Box>
        </form>
      </Grid>
      <Grid item xs={12} md={5} lg={4}>
        <ProfilePreviewCard
          profile={{ ...profile, ...watchedValues, themeColor, image, cover, logo }}
          links={links}
          products={products}
        />
      </Grid>
    </Grid>
  )
}

export default AboutTab
