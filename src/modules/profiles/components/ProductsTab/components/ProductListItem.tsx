import React from 'react'
import { styled } from '@mui/material/styles'
import { Box, Typography } from '@mui/material'
import Icon from 'src/@core/components/icon'
import { Product, Profile } from 'src/@core/types'
import { FaLock } from 'react-icons/fa6'
import { getProductImageUrl } from 'src/@core/utils/imageUrlUtils'

interface ProductListItemProps {
  product: Product
  profile: Profile
  handleClick: (product: Product) => void
}

const ProductCardContainer = styled(Box)(() => ({
  width: '100%',
  borderRadius: 10,
  padding: '10px',
  backgroundColor: '#F7F7F7',
  display: 'flex',
  alignItems: 'center',
  marginBottom: '5px'
}))

const ProductImage = styled('img')(() => ({
  backgroundColor: '#FFFFFF',
  borderRadius: 10,
  marginRight: 10,
  height: 120,
  width: 120,
  marginLeft: 10
}))

const ProductTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  [theme.breakpoints.down('md')]: {
    marginTop: '10px',
    fontSize: '1.1rem'
  }
}))

const ProductDescription = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  [theme.breakpoints.down('md')]: {
    marginTop: '10px',
    fontSize: '1.1rem'
  }
}))

const ProductListItem: React.FC<ProductListItemProps> = ({ product, profile, handleClick }) => {
  return (
    <ProductCardContainer
      onClick={() => {
        handleClick(product)
      }}
    >
      <Icon icon='mdi:dots-grid' />
      <ProductImage alt='link' src={getProductImageUrl(product)} />
      <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <ProductTitle variant='h6'>{product.title}</ProductTitle>
        <Typography variant='body1'>{product.price}</Typography>
        <ProductDescription variant='body1'>{product.description}</ProductDescription>
      </Box>
      {profile && profile?.id !== product.profile && <FaLock size={20} />}
    </ProductCardContainer>
  )
}

export default ProductListItem
