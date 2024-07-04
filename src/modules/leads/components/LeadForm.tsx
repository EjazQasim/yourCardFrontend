import React, { useState } from 'react'
import { Box, Button, Card, CardContent, Grid } from '@mui/material'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import toast from 'react-hot-toast'
import { useUpdateLeadMutation } from '@store/lead'
import Spinner from '@components/common/Spinner'
import ProfilePreviewCard from '@modules/shared/ProfilePreviewCard'
import ImagePicker from '@components/media/ImagePicker'
import InputField from '@components/form/InputField'

const LeadForm = ({ lead, onClose }: any) => {
  const [image, setImage] = useState(lead.image)
  const [cover, setCover] = useState(lead.cover)
  const [logo, setLogo] = useState(lead.logo)

  const [updateLead, { isLoading }] = useUpdateLeadMutation()

  const schema = yup.object().shape({
    name: yup.string(),
    location: yup.string(),
    jobTitle: yup.string(),
    company: yup.string().max(255),
    bio: yup.string()
  })

  const defaultValues = {
    name: lead.name || '',
    email: lead.email || '',
    location: lead.location || '',
    jobTitle: lead.jobTitle || '',
    company: lead.company || ''
  }

  const formFields = [
    { name: 'name', label: 'Name', capital: true },
    { name: 'email', label: 'Email', capital: true },
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
    try {
      await updateLead({ id: lead.id, body: { ...data, image, cover, logo } }).unwrap()
      toast.success('Lead updated successfully')
      onClose()
    } catch (error: any) {
      toast.error(error?.data?.message || error.error)
    }
  }

  const handleClose = () => {
    reset(lead)
    onClose()
  }

  const watchedValues = watch()

  return (
    <Card>
      <CardContent>
        <Grid container spacing={2} sx={{ minHeight: '550px' }}>
          <Grid item container xs={12} md={7} lg={8}>
            <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
              <Grid container xs={12} spacing={4}>
                <Grid item xs={12} md={4}>
                  <ImagePicker id='image' label='Profile picture' image={image} setImage={setImage} />
                </Grid>
                <Grid item xs={12} md={4}>
                  <ImagePicker id='cover' rectangle label='Cover photo' image={cover} setImage={setCover} />
                </Grid>
                <Grid item xs={12} md={4}>
                  <ImagePicker id='logo' label='Company logo' image={logo} setImage={setLogo} />
                </Grid>
                {formFields.map((field: any) => (
                  <Grid key={field.name} item xs={12} md={6}>
                    <InputField {...field} control={control} errors={errors} />
                  </Grid>
                ))}
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Button size='large' type='submit' variant='contained' sx={{ mr: 3 }} disabled={isLoading}>
                      {isLoading ? <Spinner /> : 'Update'}
                    </Button>
                    <Button size='large' variant='outlined' color='secondary' onClick={handleClose}>
                      Cancel
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </form>
          </Grid>
          <Grid item xs={12} md={5} lg={4}>
            <ProfilePreviewCard profile={{ ...lead, ...watchedValues, logo, image, cover }} />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default LeadForm
