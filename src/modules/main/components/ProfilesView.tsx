import { Grid } from '@mui/material'
import React from 'react'
import { Profile } from 'src/@core/types'
import ProfileCard from './ProfileCard'

interface ProfilesViewProps {
  profiles?: Profile[]
  live: string
}

const ProfilesView = ({ profiles, live }: ProfilesViewProps) => {
  if (!profiles) {
    return <></>
  }

  return (
    <Grid container item spacing={6}>
      {profiles &&
        profiles.map(profile => (
          <Grid item xs={12} sm={6} md={3} key={profile.id}>
            <ProfileCard profile={profile} isLive={String(profile.id) === String(live)} />
          </Grid>
        ))}
    </Grid>
  )
}

export default ProfilesView
