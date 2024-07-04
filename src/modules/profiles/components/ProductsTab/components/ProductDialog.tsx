import React, { useState } from 'react'
import { Dialog, DialogTitle, DialogContent, IconButton, Typography, Box, styled, Grid, Button } from '@mui/material'
import Icon from 'src/@core/components/icon'
import { Product } from 'src/@core/types'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import toast from 'react-hot-toast'
import { useCreateProductMutation, useDeleteProductMutation, useUpdateProductMutation } from '@store/product'
import InputField from '@components/form/InputField'
import ImagePicker from '@components/media/ImagePicker'
import Spinner from '@components/common/Spinner'
import { FaTrash, FaXmark } from 'react-icons/fa6'

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

interface ProductDialogProps {
  show: boolean
  setShow: React.Dispatch<React.SetStateAction<boolean>>
  profileId: string
  product: Product | null
}

const ProductDialog: React.FC<ProductDialogProps> = ({ show, setShow, profileId, product }) => {
  const [image, setImage] = useState<any>(product?.image)

  const [updateProduct, { isLoading: updateLoading }] = useUpdateProductMutation()
  const [createProduct, { isLoading: createLoading }] = useCreateProductMutation()
  const [deleteProduct, { isLoading: deleteLoading }] = useDeleteProductMutation()
  const schema = yup.object().shape({
    title: yup.string().trim().required().min(5).max(35),
    description: yup.string().max(255),
    price: yup.string(),
    url: yup.string().url()
  })

  const defaultValues = {
    title: product?.title || '',
    description: product?.description || '',
    price: product?.price || '',
    url: product?.url || ''
  }

  const formFields = [
    { name: 'title', label: 'Title' },
    { name: 'description', label: 'Description' },
    { name: 'price', label: 'Price' },
    { name: 'url', label: 'Url' }
  ]

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
      if (product) {
        await updateProduct({ id: product.id, body: { ...data, image } }).unwrap()
      } else {
        await createProduct({ profile: profileId, ...data, image }).unwrap()
      }
      toast.success('Product updated successfully')
      handleClose()
    } catch (error: any) {
      toast.error(error?.data?.message || error.error)
    }
  }

  const handleDeleteProduct = async () => {
    try {
      await deleteProduct(product?.id).unwrap()
      toast.success('Product deleted successfully')
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
          <Typography variant='h5'>{product ? 'Update Product' : 'Add Product'}</Typography>
        </StyledBox>
        <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
          <Grid
            item
            container
            xs={12}
            md={6}
            spacing={1}
            sx={{ margin: 'auto', display: 'flex', justifyContent: 'center' }}
          >
            <Grid item xs={12} md={4}>
              <ImagePicker id='image' label='' image={image} setImage={setImage} />
            </Grid>
            {formFields.map((field: any) => (
              <Grid key={field.name} item xs={12}>
                <InputField {...field} control={control} errors={errors} />
              </Grid>
            ))}
            <Button
              size='large'
              type='submit'
              disabled={createLoading || updateLoading}
              variant='contained'
              sx={{ mr: 3 }}
              startIcon={<Icon icon='mdi:content-save' />}
            >
              {createLoading || updateLoading ? <Spinner /> : product ? 'Update' : 'Save'}
            </Button>
            {product && (
              <Button
                onClick={handleDeleteProduct}
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
        </form>
      </StyledDialogContent>
    </StyledDialog>
  )
}

export default ProductDialog
