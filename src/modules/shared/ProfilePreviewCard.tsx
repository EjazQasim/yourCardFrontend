import React from 'react'
import { Box, Card, Typography, Button, Grid } from '@mui/material'
import { styled } from '@mui/material/styles'
import { Link, Product } from 'src/@core/types'
import {
  getLinkImageUrl,
  getLogoImageUrl,
  getProductImageUrl,
  getProfileCoverImageUrl,
  getProfileImageUrl
} from 'src/@core/utils/imageUrlUtils'
import { isNullOrEmpty } from 'src/@core/utils/miscUtils'
import { reorderItems } from 'src/@core/utils/arrayUtils'

const StyledBox = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center'
}))

const StyledPaperContainer = styled(Box)(() => ({
  height: '500px',
  width: '250px',
  backgroundImage: `url(/images/backgrounds/iphone-frame.png)`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  position: 'absolute'
}))

const StyledCardContainer = styled(Card)(() => ({
  height: '465px',
  width: '217px',
  border: 'none',
  boxShadow: 'none',
  borderRadius: '25px',
  position: 'absolute',
  margin: '17px',
  overflow: 'auto',
  scrollbarWidth: 'none',
  msOverflowStyle: 'none',
  '&::-webkit-scrollbar': {
    display: 'none'
  }
}))

const StyledCardMedia = styled('img')(() => ({
  height: 150
}))

const StyledAvatar = styled('img')(({ theme }) => ({
  top: 100,
  left: '30%',
  width: '90px',
  height: '90px',
  position: 'absolute',
  border: `2px solid ${theme.palette.common.white}`,
  borderRadius: '45px'
}))

const StyledCardContent = styled(Box)(() => ({
  marginTop: 40,
  marginLeft: 20,
  marginRight: 20,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 1,
  textAlign: 'center'
}))

const StyledLink = styled('a')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  textDecoration: 'none',
  color: theme.palette.text.primary,
  margin: '5px',
  textAlign: 'center'
}))

const StyledLinkImage = styled('img')(() => ({
  height: '100%',
  width: '100%',
  marginBottom: '4px'
}))

const StyledProduct = styled('a')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'start',
  textDecoration: 'none',
  color: theme.palette.text.primary,
  padding: '5px',
  textAlign: 'left'
}))

const StyledProductImage = styled('img')(() => ({
  height: '50px',
  width: '50px',
  borderRadius: '10px',
  marginRight: '5px'
}))

interface ProfilePreviewCardProps {
  profile: any
  links?: Link[] | null
  products?: Product[] | null
  cover?: File | null
  image?: File | null
  logo?: File | null
}

const ProfilePreviewCard: React.FC<ProfilePreviewCardProps> = ({ profile, links, products }) => {
  return (
    <StyledBox>
      <StyledPaperContainer />
      <StyledCardContainer>
        <div
          style={{
            background: profile?.themeColor ? `linear-gradient(${profile?.themeColor},transparent)` : 'transparent'
          }}
        >
          <StyledCardMedia
            src={
              profile?.cover instanceof File ? URL.createObjectURL(profile?.cover) : getProfileCoverImageUrl(profile)
            }
          />
          <StyledAvatar
            alt='Robert Meyer'
            src={profile?.image instanceof File ? URL.createObjectURL(profile?.image) : getProfileImageUrl(profile)}
          />
          {!isNullOrEmpty(profile.logo) ? (
            <StyledAvatar
              sx={{ width: '40px', height: '40px', marginTop: '50px', marginLeft: '50px' }}
              alt='Robert Meyer'
              src={profile?.logo instanceof File ? URL.createObjectURL(profile.logo) : getLogoImageUrl(profile)}
            />
          ) : null}

          <StyledCardContent>
            <Typography style={{ lineBreak: 'anywhere' }} variant='body1'>
              {profile?.name}
            </Typography>
            <Typography style={{ fontSize: '9px' }} variant='caption'>
              {profile?.jobTitle} {profile?.jobTitle && profile?.company && '@'} {profile?.company}
            </Typography>
            <Typography style={{ fontSize: '9px' }} variant='caption'>
              {profile?.location}
            </Typography>
            <Typography
              style={{
                fontSize: '9px',
                marginBottom: '10px',
                whiteSpace: 'pre-line'
              }}
              variant='caption'
            >
              {profile?.bio}
            </Typography>
            <Button
              style={{
                background: profile?.themeColor === '#f0f0f0' ? `black` : profile?.themeColor
              }}
              variant='contained'
              size='small'
            >
              Save Contact
            </Button>
          </StyledCardContent>
        </div>
        <div>
          <Box sx={{ marginLeft: '10px', marginRight: '10px' }}>
            <Grid container spacing={1}>
              {reorderItems(links, profile.id)?.map(link => {
                if (link.status === true) {
                  return (
                    <Grid item xs={4} key={link.id}>
                      <StyledLink
                        href={link.platform.webBaseURL + link.value}
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        <StyledLinkImage
                          src={getLinkImageUrl(link)}
                          alt={link.title}
                          style={{ width: '50px', height: '50px' }} // Set the desired width and height
                        />{' '}
                        <Typography style={{ fontSize: '8px' }} variant='caption'>
                          {link.title ? link.title : link.platform.title}
                        </Typography>
                      </StyledLink>
                    </Grid>
                  )
                }
              })}
            </Grid>
            {products && products.length > 0 && (
              <Typography style={{ marginTop: '10px' }}>{profile?.category || 'Products'}</Typography>
            )}
            <Grid container spacing={1}>
              {reorderItems(products, profile.id)?.map(product => {
                return (
                  <Grid item xs={12} key={product.id}>
                    <StyledProduct href={product.url} target='_blank' rel='noopener noreferrer'>
                      <StyledProductImage src={getProductImageUrl(product)} alt={product?.title} />
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'start'
                        }}
                      >
                        <Typography variant='caption'>{product.title}</Typography>
                        <Typography variant='caption' sx={{ fontSize: '8px' }}>
                          {product.price}
                        </Typography>
                        <Typography variant='caption' sx={{ fontSize: '8px' }}>
                          {product.description}
                        </Typography>
                      </Box>
                    </StyledProduct>
                  </Grid>
                )
              })}
            </Grid>
          </Box>
        </div>
      </StyledCardContainer>
    </StyledBox>
  )
}

export default ProfilePreviewCard
