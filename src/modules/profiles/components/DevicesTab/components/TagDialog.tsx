import React from 'react'
import { Dialog, DialogTitle, DialogContent, IconButton, Typography, Box, styled, Grid, Button } from '@mui/material'
import Icon from 'src/@core/components/icon'
import { Tag } from 'src/@core/types'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import toast from 'react-hot-toast'
import { useUpdateTagMutation } from '@store/tag'
import InputField from '@components/form/InputField'
import Spinner from '@components/common/Spinner'
import { FaXmark } from 'react-icons/fa6'

const StyledBox = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  mb: 2,
  textAlign: 'center'
}))

const StyledDialog = styled(Dialog)(() => ({
  '& .MuiDialog-container': {
    alignItems: 'flex-start'
  }
}))

const StyledDialogTitle = styled(DialogTitle)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
}))

const StyledDialogContent = styled(DialogContent)(() => ({
  px: { xs: 8, sm: 15 },
  py: { xs: 8, sm: 12.5 },
  position: 'relative'
}))

interface TagDialogProps {
  show: boolean
  setShow: React.Dispatch<React.SetStateAction<boolean>>
  tag: Tag
}

const TagDialog: React.FC<TagDialogProps> = ({ show, setShow, tag }) => {
  const [updateTag, { isLoading: updateLoading }] = useUpdateTagMutation()

  const schema = yup.object().shape({
    name: yup.string().trim().required().min(3).max(35)
  })

  const defaultValues = {
    name: tag?.name || ''
  }

  const formFields = [{ name: 'name', label: 'Name' }]

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema)
  })

  const onSubmit = async (data: any) => {
    try {
      await updateTag({ id: tag.id, body: data }).unwrap()
      toast.success('Tag updated successfully')
      handleClose()
    } catch (error: any) {
      toast.error(error?.data?.message || error.error)
    }
  }

  const handleClose = () => {
    setShow(false)
  }

  return (
    <StyledDialog fullWidth open={show} maxWidth='md' scroll='paper' onClose={handleClose}>
      <StyledDialogTitle>
        <IconButton sx={{ marginLeft: 'auto' }} onClick={handleClose}>
          <FaXmark />
        </IconButton>
      </StyledDialogTitle>
      <StyledDialogContent>
        <StyledBox>
          <Typography variant='h5'>Update Tag</Typography>
        </StyledBox>
        <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
          <Grid
            item
            container
            xs={12}
            md={6}
            gap={2}
            sx={{ margin: 'auto', display: 'flex', justifyContent: 'center', mt: '20px' }}
          >
            {formFields.map((field: any) => (
              <Grid key={field.name} item xs={12}>
                <InputField {...field} control={control} errors={errors} />
              </Grid>
            ))}
            <Button
              size='large'
              type='submit'
              disabled={updateLoading}
              variant='contained'
              sx={{ mr: 3 }}
              startIcon={<Icon icon='mdi:content-save' />}
            >
              {updateLoading ? <Spinner /> : 'Update'}
            </Button>
          </Grid>
        </form>
      </StyledDialogContent>
    </StyledDialog>
  )
}

export default TagDialog
