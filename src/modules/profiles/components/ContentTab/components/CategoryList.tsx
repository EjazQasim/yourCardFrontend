import React from 'react'
import { Typography, Box, Grid, styled } from '@mui/material'
import { Category, Link, Platform } from 'src/@core/types'
import { useGetCategoriesQuery } from '@store/category'
import PlatformCard from './PlatformCard'
import { reorderItems } from 'src/@core/utils/arrayUtils'
import { getPlatformImageUrl } from 'src/@core/utils/imageUrlUtils'

interface CategoryListProps {
  links: Link[]
  setPlatform: React.Dispatch<React.SetStateAction<Platform | null>>
  setLink: React.Dispatch<React.SetStateAction<Link | null>>
}

const StyledBox = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  mb: 2,
  textAlign: 'center'
}))

const CategoryList: React.FC<CategoryListProps> = ({ links, setPlatform, setLink }) => {
  const { data } = useGetCategoriesQuery({ limit: 10 })

  const handlePlatformClick = (platform: Platform) => {
    if (platform.type === 'contact') {
      const link = links?.find((l: Link) => l.platform.type === 'contact')
      if (link) {
        setLink(link)
      } else {
        setPlatform(platform)
      }
    } else {
      setPlatform(platform)
    }
  }

  return (
    <>
      <StyledBox>
        <Typography variant='h5'>Add content</Typography>
        <Typography variant='body2'>Select from our wide variety of links and contact info below.</Typography>
      </StyledBox>
      {reorderItems(data?.results)?.map((category: Category) => (
        <Box key={category.id}>
          <Typography variant='h6' mb={2}>
            {category.name}
          </Typography>
          <Grid container spacing={6} key={category.id} mb={4}>
            {reorderItems(category.platforms)?.map((p: Platform) => (
              <Grid
                item
                xs={12}
                md={4}
                key={p.id}
                onClick={() => {
                  handlePlatformClick(p)
                }}
              >
                <PlatformCard image={getPlatformImageUrl(p)} title={p.title} />
              </Grid>
            ))}
          </Grid>
        </Box>
      ))}
    </>
  )
}

export default CategoryList
