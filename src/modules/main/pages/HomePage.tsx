import { Box, Button, Grid, IconButton, Typography } from '@mui/material'
import { useAuth } from 'src/hooks/useAuth'
import { styled } from '@mui/material/styles'
import { useRouter } from 'next/router'
import { useGetMyProfilesQuery } from '@store/profile'
import { FaPlus } from 'react-icons/fa6'
import ProfileDropdown from '@modules/shared/ProfileDropdown'
import MembersTable from '../components/MembersTable'
import ProfilesView from '../components/ProfilesView'

const RoundedButton = styled(Button)(() => ({
  borderRadius: '24px',
  marginLeft: 'auto'
}))

const HomePage = () => {
  const router = useRouter()

  const { user }: any = useAuth()

  const { data } = useGetMyProfilesQuery<any>({})

  return (
    <Grid container spacing={6}>
      <Grid item container justifyContent='space-between' alignItems='center'>
        <Typography variant='h5' component='h1'>
          {user?.team ? 'Members' : 'My Cards'}
        </Typography>
        <Box ml={1}>
          {!user?.team && user?.isPro && (
            <IconButton
              onClick={() => {
                router.push(`/profiles`)
              }}
              color='secondary'
              size='large'
            >
              <FaPlus />
            </IconButton>
          )}
          {user?.team?.admins?.includes(user?.id) && (
            <IconButton
              onClick={() => {
                router.replace('add-members')
              }}
              color='secondary'
              size='large'
            >
              <FaPlus />
            </IconButton>
          )}
        </Box>
        <Box sx={{ display: 'flex', marginLeft: 'auto' }}>
          {user?.team ? (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <ProfileDropdown profiles={data?.results} />
              {user?.team?.admins?.includes(user?.id) && (
                <RoundedButton
                  onClick={() => {
                    router.push(`/profiles/${user?.team?.profile?.id}`)
                  }}
                  variant='contained'
                  color='primary'
                >
                  Master Profile
                </RoundedButton>
              )}
            </Box>
          ) : (
            <RoundedButton
              onClick={() => {
                router.push('/subscribe')
              }}
              variant='contained'
              color='primary'
            >
              Upgrade Now
            </RoundedButton>
          )}
        </Box>
      </Grid>
      {user && (
        <>
          {user.team ? (
            <MembersTable user={user} team={user.team} />
          ) : (
            <ProfilesView profiles={data?.results} live={user.live.id} />
          )}
        </>
      )}
    </Grid>
  )
}

export default HomePage
