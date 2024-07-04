import React, { useState } from 'react'
import { styled } from '@mui/material/styles'
import { Box, IconButton, Typography } from '@mui/material'
import { FaPencil, FaTrash } from 'react-icons/fa6'
import { Tag } from 'src/@core/types'
import Alert from '@components/common/Alert'
import { useLazyUnLinkTagQuery } from '@store/tag'

const TagCardContainer = styled(Box)(() => ({
  width: '100%',
  borderRadius: 10,
  padding: '10px',
  backgroundColor: '#F7F7F7',
  display: 'flex',
  alignItems: 'center'
}))

const TagName = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  [theme.breakpoints.down('md')]: {
    marginTop: '10px',
    fontSize: '1.1rem'
  }
}))

const TagUrl = styled(Typography)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    marginTop: '10px',
    fontSize: '0.5rem'
  }
}))

interface TagCardProps {
  handleClick: any
  tag: Tag
}

const TagCard: React.FC<TagCardProps> = ({ tag, handleClick }) => {
  const [showDeleteTagDialog, setShowDeleteTagDialog] = useState(false)

  const [unLinkTag] = useLazyUnLinkTagQuery()

  const handleUnlinkTag = async () => {
    await unLinkTag(tag.id)
    setShowDeleteTagDialog(false)
  }

  return (
    <>
      <TagCardContainer>
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
          <TagName>{tag.name}</TagName>
          <TagUrl>{tag.url}</TagUrl>
        </Box>
        <IconButton onClick={() => handleClick(tag)}>
          <FaPencil size={20} />
        </IconButton>
        <IconButton onClick={() => setShowDeleteTagDialog(true)}>
          <FaTrash color='red' size={20} />
        </IconButton>
      </TagCardContainer>
      <Alert
        show={showDeleteTagDialog}
        setShow={setShowDeleteTagDialog}
        message={'Are you sure you would like to unlink this device?'}
        handleSuccess={handleUnlinkTag}
      />
    </>
  )
}

export default TagCard
