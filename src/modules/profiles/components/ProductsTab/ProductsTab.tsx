import React, { useState } from 'react'
import { Box, Button, Grid, Paper, InputBase, IconButton } from '@mui/material'
import { Product } from 'src/@core/types'
import ProfilePreviewCard from '@modules/shared/ProfilePreviewCard'
import ProductDialog from './components/ProductDialog'
import ProductsList from './components/ProductsList'
import { useUpdateProfileMutation } from '@store/profile'
import toast from 'react-hot-toast'
import { FaFloppyDisk } from 'react-icons/fa6'
import Spinner from '@components/common/Spinner'

const ProductsTab = ({ profile, links, products }: any) => {
  const [showProductDialog, setShowProductDialog] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [title, setTitle] = useState(profile?.category || '')
  const [formKey, setFormKey] = useState(1)

  const [updateProfile, { isLoading }] = useUpdateProfileMutation()

  const handleCloseProductDialog = () => {
    setShowProductDialog(false)
    setSelectedProduct(null)
  }

  const handleProductClick = (product: Product) => {
    if (profile?.id === product.profile) {
      setSelectedProduct(product)
      setShowProductDialog(true)
      setFormKey(Math.random())
    }
  }

  const handleTitleChange = async () => {
    if (profile && title.length > 5 && title.length <= 30) {
      try {
        await updateProfile({ id: profile.id, body: { category: title } }).unwrap()
        toast.success('Profile updated successfully')
      } catch (error: any) {
        toast.error(error?.data?.message || error.error)
      }
    } else {
      toast.error('Title length must be in range of 5-30')
    }
  }

  return (
    <Grid container>
      {isLoading && <Spinner />}
      <Grid item xs={12} md={7} lg={8}>
        <Box sx={{ mb: 3, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <Paper
              component='form'
              sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 250, height: 40 }}
            >
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder='Enter title'
                value={title}
                onChange={e => setTitle(e.target.value)}
              />
              <IconButton type='button' sx={{ p: '10px' }} onClick={handleTitleChange} disabled={isLoading}>
                <FaFloppyDisk />
              </IconButton>
            </Paper>
          </div>
          <Button
            variant='contained'
            onClick={() => {
              setShowProductDialog(true)
              setFormKey(Math.random())
            }}
            size='small'
          >
            Add {profile.category || 'Products'}
          </Button>
        </Box>
        <ProductsList products={products} profile={profile} handleClick={handleProductClick} />
      </Grid>
      <Grid item xs={12} md={5} lg={4}>
        <ProfilePreviewCard profile={{ ...profile, category: title }} links={links} products={products} />
      </Grid>

      <ProductDialog
        key={formKey}
        profileId={profile.id}
        show={showProductDialog}
        setShow={handleCloseProductDialog}
        product={selectedProduct}
      />
    </Grid>
  )
}

export default ProductsTab
