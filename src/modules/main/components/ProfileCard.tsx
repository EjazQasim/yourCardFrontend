import React from 'react'
import Link from 'next/link'
import { Card, Avatar, Typography, CardContent, Button, Box } from '@mui/material'
import { styled } from '@mui/material/styles'
import { Profile } from 'src/@core/types'
import toast from 'react-hot-toast'
import { useUpdateUserMutation } from '@store/user'
import { useAuth } from 'src/hooks/useAuth'
import { getProfileCoverImageUrl, getProfileImageUrl } from 'src/@core/utils/imageUrlUtils'

interface ProfileCardProps {
  profile: Profile
  isLive: boolean
}

const StyledCard = styled(Card)(() => ({
  position: 'relative'
}))

const BackgroundImage = styled('div')(() => ({
  backgroundSize: '100% 100%',
  backgroundRepeat: 'no-repeat',
  height: 140,
  width: '100%',
  paddingTop: '85px'
}))

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  margin: 'auto',
  width: 100,
  height: 100,
  border: `3px solid ${theme.palette.common.white}`
}))

const StyledButton = styled(Button)(() => ({
  fontSize: '12px'
}))

const StyledCardContent = styled(Box)(() => ({
  marginTop: 30,
  display: 'flex',
  flexDirection: 'column',
  height: '100px',
  alignItems: 'center',
  justifyContent: 'space-between'
}))

const ProfileContent = styled(Box)(() => ({
  marginLeft: 20,
  marginRight: 20,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 1,
  textAlign: 'center'
}))

const FooterContent = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: 3
}))

const ProfileCard: React.FC<ProfileCardProps> = ({ profile, isLive }) => {
  const { refetch } = useAuth()
  const [updateUser] = useUpdateUserMutation()

  const handleMakeLive = async (profileId: string) => {
    try {
      await updateUser({
        live: profileId
      }).unwrap()
      refetch()
    } catch (error: any) {
      toast.error(error?.data?.message || error.error)
    }
  }

  return (
    <StyledCard>
      <BackgroundImage
        style={{
          backgroundImage: `url(${getProfileCoverImageUrl(profile)})`
        }}
      >
        <StyledAvatar alt={profile.name} src={getProfileImageUrl(profile)} />
      </BackgroundImage>
      <CardContent>
        <StyledCardContent>
          <ProfileContent>
            <Typography sx={{ maxWidth: 200 }} variant='body1' noWrap>
              {profile.name || ''}
            </Typography>
            <Typography style={{ maxWidth: 200, fontSize: '9px' }} variant='caption' noWrap>
              {`${profile.jobTitle || ''} ${profile.jobTitle && profile.company ? '@' : ''} ${profile.company || ''}`}
            </Typography>
            <Typography style={{ maxWidth: 200, fontSize: '9px' }} variant='caption' noWrap>
              {profile.location || ''}
            </Typography>
            <Typography style={{ maxWidth: 200, fontSize: '9px', marginBottom: '10px' }} variant='caption' noWrap>
              {profile.bio || ''}
            </Typography>
          </ProfileContent>
          <FooterContent>
            <Link href={`/profiles/${profile.id}`}>
              <StyledButton size='small' variant='contained'>
                Edit Card
              </StyledButton>
            </Link>
            <StyledButton size='small' variant='outlined' onClick={() => handleMakeLive(profile.id)} disabled={isLive}>
              {isLive ? 'Live' : 'Make live'}
            </StyledButton>
          </FooterContent>
        </StyledCardContent>
      </CardContent>
    </StyledCard>
  )
}

export default ProfileCard
