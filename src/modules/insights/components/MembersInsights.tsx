import Avatar from '@components/mui/avatar'
import { Box, Button, Chip, Grid, Typography } from '@mui/material'
import { useGetMembersQuery } from '@store/team'
import { useState } from 'react'
import { useAuth } from 'src/hooks/useAuth'
import DataTable from '@components/tables/DataTable'
import { getProfileImageUrl } from 'src/@core/utils/imageUrlUtils'

const MembersInsights = ({ setProfile }: any) => {
  const { user } = useAuth()

  const [query, setQuery] = useState({ page: 1, limit: 10 })

  const { data } = useGetMembersQuery({
    teamId: user.team.id,
    ...query
  })

  const columns = [
    {
      field: 'name',
      headerName: 'User',
      flex: 1,
      renderCell: ({ row }: any) => {
        const profile = row.live
        const isAdmin = user?.team?.admins?.includes(row.id)
        const isMe = user?.id === row.id

        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar src={getProfileImageUrl(profile)} sx={{ mr: 3, width: 34, height: 34 }} />
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography variant='subtitle2' sx={{ color: 'text.primary' }}>
                {profile.name} {isMe && '(Me)'} {isAdmin && <Chip label={isAdmin ? 'Admin' : ''} size='small' />}
              </Typography>
              <Typography variant='caption' sx={{ lineHeight: 1.6667 }}>
                {row.email}
              </Typography>
            </Box>
          </Box>
        )
      }
    },
    {
      field: 'taps',
      headerName: 'Taps',
      minWidth: 150,
      renderCell: ({ row }: any) => {
        return <Typography variant='body2'>{row.live.taps}</Typography>
      }
    },
    {
      field: 'views',
      headerName: 'Views',
      minWidth: 150,
      renderCell: ({ row }: any) => {
        return <Typography variant='body2'>{row.live.views}</Typography>
      }
    },
    {
      field: 'createdAt',
      headerName: 'Created At',
      minWidth: 150,
      renderCell: ({ row }: any) => <Typography variant='body2'>{row.createdAt.split('T')[0]}</Typography>
    },
    {
      field: 'id',
      headerName: '',
      minWidth: 200,
      renderCell: ({ row }: any) => (
        <Button
          variant='outlined'
          onClick={() => {
            setProfile(row.live)
          }}
        >
          View Insights
        </Button>
      )
    }
  ]

  return (
    <Grid item xs={12}>
      <DataTable results={data?.results} totalResults={data?.totalResults} columns={columns} setQuery={setQuery} />
    </Grid>
  )
}

export default MembersInsights
