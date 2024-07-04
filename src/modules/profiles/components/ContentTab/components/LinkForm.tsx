import React, { useState } from 'react'
import { Button, Grid } from '@mui/material'
import { Link, Platform, Profile } from 'src/@core/types'
import toast from 'react-hot-toast'
import { useCreateLinkMutation, useDeleteLinkMutation, useGetLinksQuery, useUpdateLinkMutation } from '@store/link'
import ImagePicker from '@components/media/ImagePicker'
import InputField from '@components/form/InputField'
import { FaFloppyDisk, FaTrash } from 'react-icons/fa6'
import Spinner from '@components/common/Spinner'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import PhoneField from '@components/form/PhoneField'
import { useAuth } from 'src/hooks/useAuth'
import { getLinkImageUrl, getPlatformImageUrl } from 'src/@core/utils/imageUrlUtils'
import LinksList from './LinksList'

interface LinkFormProps {
  profile: Profile
  platform: Platform
  link: Link | null
  handleClose: any
}

const getValidationSchema = (platform: Platform) => {
  let schema: any
  switch (platform.type) {
    case 'contact':
      schema = yup.object().shape({
        title: yup.string().min(1).max(15),
        firstName: yup.string().trim().required(),
        lastName: yup.string(),
        company: yup.string(),
        jobTitle: yup.string(),
        workPhone: yup.string(),
        homePhone: yup.string(),
        mobile: yup.string(),
        email: yup.string().email(),
        address: yup.string(),
        website: yup.string()
      })
      break
    case 'file':
      schema = yup.object().shape({
        title: yup.string().min(1).max(15)
      })
      break
    case 'phone':
      schema = yup.object().shape({
        title: yup.string().required().min(1).max(15).trim(),
        value: yup.string().required('Phone number is required').min(10)
      })
      break
    default:
      schema = yup.object().shape({
        title: yup.string().required().min(1).max(15),
        value: yup.string().trim().required()
      })
  }

  return schema
}

const getFormFields = (platform: Platform) => {
  switch (platform.type) {
    case 'contact':
      return [
        { name: 'firstName', label: 'First Name', capital: true },
        { name: 'lastName', label: 'Last Name', capital: true },
        { name: 'company', label: 'Company', capital: true },
        { name: 'jobTitle', label: 'Job Title', capital: true },
        { name: 'workPhone', label: 'Work Phone', type: 'phone' },
        { name: 'homePhone', label: 'Home Phone', type: 'phone' },
        { name: 'mobile', label: 'Mobile', type: 'phone' },
        { name: 'email', label: 'Email' },
        { name: 'address', label: 'Address' },
        { name: 'website', label: 'Website' }
      ]
    case 'file':
      return [{ name: 'file', label: 'File', type: 'file' }]
    default:
      return [{ name: 'value', label: 'Value', type: platform.type }]
  }
}

const LinkForm: React.FC<LinkFormProps> = ({ profile, platform, link, handleClose }) => {
  const { user } = useAuth()
  const [image, setImage] = useState<any>(link?.image)

  const [updateLink, { isLoading: updateLoading }] = useUpdateLinkMutation()
  const [createLink, { isLoading: createLoading }] = useCreateLinkMutation()
  const [deleteLink, { isLoading: deleteLoading }] = useDeleteLinkMutation()
  const { data: linksData } = useGetLinksQuery({ profile: profile?.id, limit: 100 }, { skip: !profile })

  const schema = getValidationSchema(platform)

  const defaultValues = {
    title: link?.title ? link.title : platform.title,
    value: platform.type === 'contact' ? profile?.id : link?.value,
    ...(link?.data ? JSON.parse(link.data) : {})
  }

  const formFields = getFormFields(platform)

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema)
  })

  const onSubmit = async (data: any) => {
    const jsonData = JSON.stringify({
      firstName: data.firstName,
      lastName: data.lastName,
      company: data.company,
      jobTitle: data.jobTitle || '',
      workPhone: data.workPhone || '',
      homePhone: data.homePhone || '',
      mobile: data.mobile || '',
      email: data.email || '',
      address: data.address || '',
      website: data.website || ''
    })

    let body: any = { ...data, image }
    if (platform.type === 'contact') {
      body = { ...body, value: profile?.id, data: jsonData }
    } else if (platform.type === 'file') {
      body = { ...body, value: body.file.name }
    }

    try {
      if (link) {
        await updateLink({ id: link.id, body }).unwrap()
      } else {
        await createLink({ profile: profile?.id, platform: platform.id, ...body }).unwrap()
      }
      toast.success('Link updated successfully')
      handleClose()
    } catch (error: any) {
      toast.error(error?.data?.message || error.error)
    }
  }

  const handleDeleteLink = async () => {
    try {
      await deleteLink(link?.id).unwrap()
      toast.success('Link deleted successfully')
      handleClose()
    } catch (error: any) {
      toast.error(error?.data?.message || error.error)
    }
  }

  return (
    <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
      <Grid
        item
        container
        xs={12}
        md={6}
        spacing={1}
        sx={{ margin: 'auto', display: 'flex', justifyContent: 'center', textAlign: 'center' }}
      >
        <Grid item xs={12}>
          <ImagePicker
            id='image'
            label=''
            image={image}
            setImage={setImage}
            disabled={!user?.team && !user?.isPro}
            editButton={user?.team || user?.isPro}
            placeholder={link && link.image ? getLinkImageUrl(link) : getPlatformImageUrl(platform)}
          />
        </Grid>
        <Grid item xs={6}>
          <InputField
            name='title'
            label='Title'
            control={control}
            errors={errors}
            disabled={!user?.team && !user?.isPro}
          />
        </Grid>
        <Grid item xs={12}>
          {platform.headline}
        </Grid>
        {formFields.map((field: any) => (
          <Grid key={field.name} item xs={12}>
            {field?.type === 'phone' ? (
              <PhoneField control={control} name={field.name} label={field.label} errors={errors} />
            ) : (
              <InputField {...field} control={control} errors={errors} setValue={setValue} />
            )}
          </Grid>
        ))}

        <Grid item xs={12}>
          {platform.type === 'contact' && <LinksList links={linksData?.results} profile={profile} type={'contact'} />}
          <Button
            size='large'
            type='submit'
            disabled={createLoading || updateLoading}
            variant='contained'
            sx={{ mr: 3 }}
            startIcon={<FaFloppyDisk />}
          >
            {createLoading || updateLoading ? <Spinner /> : link ? 'Update' : 'Save'}
          </Button>
          {link && (
            <Button
              onClick={handleDeleteLink}
              size='large'
              variant='outlined'
              color='error'
              disabled={deleteLoading}
              startIcon={<FaTrash />}
            >
              Delete
            </Button>
          )}
        </Grid>
      </Grid>
    </form>
  )
}

export default LinkForm
