import { Grid, IconButton, Typography } from '@mui/material'
import { FaChevronLeft } from 'react-icons/fa6'
import { useAuth } from 'src/hooks/useAuth'
import MembersInsights from '../components/MembersInsights'
import UserInsights from '../components/UserInsights'
import { useState } from 'react'

const InsightsPage = () => {
  const { user } = useAuth()

  const [profile, setProfile] = useState(null)

  if (!user) {
    return <></>
  }

  return (
    <Grid container spacing={6}>
      <Grid item container alignItems='center'>
        {profile && (
          <Grid item>
            <IconButton
              onClick={() => {
                setProfile(null)
              }}
            >
              <FaChevronLeft />
            </IconButton>
          </Grid>
        )}
        <Grid item>
          <Typography variant='h5' component='h1'>
            Insights
          </Typography>
        </Grid>
      </Grid>
      <Grid item container alignItems='center'>
        {user.team && user.team?.admins.includes(user.id) && !profile ? (
          <MembersInsights setProfile={setProfile} />
        ) : (
          <UserInsights profile={profile || user.live} />
        )}
      </Grid>
    </Grid>
  )
}

export default InsightsPage
