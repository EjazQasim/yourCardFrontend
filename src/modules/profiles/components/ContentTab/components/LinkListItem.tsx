import React from 'react'
import { styled } from '@mui/material/styles'
import { Box, Button, Switch, Typography } from '@mui/material'
import Icon from 'src/@core/components/icon'
import { Link, Profile } from 'src/@core/types'
import toast from 'react-hot-toast'
import { useUpdateLinkMutation } from '@store/link'
import { useUpdateProfileMutation } from '@store/profile'
import { FaLock } from 'react-icons/fa6'
import Spinner from '@components/common/Spinner'
import { getLinkImageUrl } from 'src/@core/utils/imageUrlUtils'

interface LinkListItemProps {
  link: Link
  profile: Profile
  handleClick?: (link: Link) => void
  type?: string
}

const LinkCardContainer = styled(Box)(() => ({
  width: '100%',
  borderRadius: 10,
  padding: '10px',
  backgroundColor: '#F7F7F7',
  display: 'flex',
  alignItems: 'center',
  marginBottom: '5px',
  justifyContent: 'space-between'
}))

const LinkImage = styled('img')(() => ({
  marginRight: 10,
  height: 40,
  width: 40
}))

const LinkTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  [theme.breakpoints.down('md')]: {
    marginTop: '10px',
    fontSize: '1.1rem'
  }
}))

const LinkListItem: React.FC<LinkListItemProps> = ({ link, profile, handleClick, type = 'default' }) => {
  const [updateProfile, { isLoading }] = useUpdateProfileMutation()
  const [updateLink] = useUpdateLinkMutation()

  const handleMakeDirect = async () => {
    try {
      await updateProfile({ id: profile?.id, body: { direct: link.id } }).unwrap()
    } catch (error: any) {
      toast.error(error?.data?.message || error.error)
    }
  }

  const handleMakeActive = async () => {
    try {
      await updateLink({ id: link?.id, body: { status: !link.status } }).unwrap()
    } catch (error: any) {
      toast.error(error?.data?.message || error.error)
    }
  }
  const handleMakeContact = async () => {
    try {
      await updateLink({ id: link?.id, body: { isContact: !link.isContact } }).unwrap()
    } catch (error: any) {
      toast.error(error?.data?.message || error.error)
    }
  }

  return (
    <LinkCardContainer>
      <Box
        onClick={() => {
          handleClick ? handleClick(link) : ''
        }}
        sx={{ display: 'flex', alignItems: 'center' }}
      >
        {type != 'contact' && <Icon icon='mdi:dots-grid' fontSize='20px' />}
        <LinkImage alt='link' src={getLinkImageUrl(link)} />
        <LinkTitle variant='h6'>{link.title || link.platform.title}</LinkTitle>
        {profile && profile?.id !== link.profile && <FaLock size={20} />}
      </Box>
      {type != 'contact' ? (
        <Box>
          {!profile.directOn ? (
            <Switch color='secondary' checked={link.status} onChange={handleMakeActive} />
          ) : (
            <>
              {profile?.direct?.id !== link?.id && (
                <Button size='small' variant='outlined' onClick={handleMakeDirect} disabled={isLoading}>
                  {isLoading ? <Spinner /> : 'Make direct'}
                </Button>
              )}
            </>
          )}
        </Box>
      ) : (
        <Box>
          <Switch color='secondary' checked={link.isContact} onChange={handleMakeContact} />
        </Box>
      )}
    </LinkCardContainer>
  )
}

export default LinkListItem
