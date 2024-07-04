import React, { useState } from 'react'
import { Avatar, IconButton, Popover, Typography, Box, Card, Button } from '@mui/material'
import { styled } from '@mui/material/styles'
import { useAuth } from 'src/hooks/useAuth'
import Icon from 'src/@core/components/icon'
import { useUpdateUserMutation } from 'src/store/user'
import toast from 'react-hot-toast'
import { Profile } from 'src/@core/types'
import Spinner from '@components/common/Spinner'
import { FaPlus } from 'react-icons/fa'
import { useRouter } from 'next/router'
import { getProfileImageUrl } from 'src/@core/utils/imageUrlUtils'

interface ProfileDropdownProps {
  profiles?: Profile[]
}

const DropdownCard = styled(Card)(() => ({
  display: 'flex',
  alignItems: 'center',
  marginRight: '10px',
  padding: '5px',
  '& .avatar': {
    marginRight: '10px'
  },
  '& .dropdownIcon': {
    color: '#757575',
    cursor: 'pointer',
    marginLeft: '50px'
  }
}))

const ProfileCard = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '10px'
}))

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({ profiles }) => {
  const router = useRouter()

  const { user, refetch } = useAuth()
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)

  const [updateUser, { isLoading: UpdateUserLoading }] = useUpdateUserMutation()

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleMakeLive = async (profileId: string) => {
    try {
      await updateUser({
        live: profileId
      }).unwrap()
      refetch()
      handleClose()
    } catch (error: any) {
      toast.error(error?.data?.message || error.error)
    }
  }
  const handleAddContentCard = () => {
    console.log(profiles?.length)
    if ((profiles?.length ?? 0) < 10) {
      router.push(`/profiles`)
    } else {
      toast.error("Can't add more than 10 Profiles", {
        position: 'bottom-left'
      })
    }
  }
  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  return (
    <>
      <DropdownCard>
        <Avatar alt='Avatar' src={getProfileImageUrl(user?.live)} className='avatar' />
        <Typography variant='body1'>{user?.live?.name}</Typography>

        <IconButton onClick={handleClick}>
          <Icon icon='mdi:chevron-down' />
        </IconButton>
      </DropdownCard>

      <Popover
        sx={{ marginTop: '10px' }}
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
      >
        <Box
          sx={{
            width: '350px',
            maxHeight: '300px',
            overflowY: 'auto',
            scrollbarWidth: 'none',
            '::-webkit-scrollbar': { display: 'none' }
          }}
        >
          {profiles?.map(profile => (
            <ProfileCard key={profile.id}>
              <Box sx={{ marginRight: '10px' }} onClick={() => router.push(`/profiles/${profile.id}`)}>
                <Avatar
                  alt='Avatar'
                  src={getProfileImageUrl(profile)}
                  className='avatar'
                  sx={{ width: '50px', height: '50px' }}
                />
              </Box>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant='body1' sx={{ fontWeight: 'bold', lineHeight: '1', marginBottom: '8px' }}>
                  {profile.name}
                </Typography>
                <Typography variant='body1' sx={{ lineBreak: 'anywhere', marginBottom: '8px' }}>
                  {profile.bio}
                </Typography>
              </Box>
              <Box>
                <Button
                  size='small'
                  variant='outlined'
                  onClick={() => handleMakeLive(profile.id)}
                  disabled={String(profile.id) === String(user?.live?.id)}
                >
                  {UpdateUserLoading ? (
                    <Spinner />
                  ) : String(profile.id) === String(user?.live?.id) ? (
                    'Live'
                  ) : (
                    'Make live'
                  )}
                </Button>
              </Box>
            </ProfileCard>
          ))}
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center', margin: '10px' }}>
          <Button
            size='small'
            variant='contained'
            color='primary'
            fullWidth
            sx={{
              borderRadius: '24px',
              padding: '10px'
            }}
            onClick={() => handleAddContentCard()}
          >
            <FaPlus /> Create a new Card
          </Button>
        </Box>
      </Popover>
    </>
  )
}

export default ProfileDropdown
