import React from 'react'
import { styled } from '@mui/material/styles'
import { Typography } from '@mui/material'

interface PlatformCardProps {
  image?: string
  title?: string
  url?: string
}

const PlatformCardContainer = styled('a')(() => ({
  borderRadius: 10,
  display: 'flex',
  alignItems: 'center',
  padding: 10,
  color: 'common.white',
  backgroundColor: '#F7F7F7'
}))

const PlatformImage = styled('img')(() => ({
  marginRight: 10,
  height: 40,
  width: 40
}))

const PlatformTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  [theme.breakpoints.down('md')]: {
    marginTop: '10px',
    fontSize: '1.1rem'
  }
}))

const PlatformCard: React.FC<PlatformCardProps> = ({ image, title, url }) => {
  return (
    <PlatformCardContainer href={url}>
      <PlatformImage alt='platform' src={image} />
      <PlatformTitle>{title}</PlatformTitle>
    </PlatformCardContainer>
  )
}

export default PlatformCard
