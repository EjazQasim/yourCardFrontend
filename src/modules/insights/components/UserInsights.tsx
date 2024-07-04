import CardStatsVertical from '@components/others/card-statistics/card-stats-vertical'
import DataTable from '@components/tables/DataTable'
import { Box, Grid, Typography } from '@mui/material'
import { useGetLinksQuery } from '@store/link'
import { useState } from 'react'
import { Profile } from 'src/@core/types'
import { getLinkImageUrl } from 'src/@core/utils/imageUrlUtils'

const UserInsights = ({ profile }: { profile: Profile }) => {
  const [query, setQuery] = useState({ page: 1, limit: 10 })

  const { data } = useGetLinksQuery({ profile: profile.id, ...query })

  const columns = [
    {
      field: 'id',
      headerName: 'Link',
      flex: 1,
      renderCell: ({ row }: any) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <img alt='' src={getLinkImageUrl(row)} style={{ marginRight: 3, width: 34, height: 34 }} />
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography variant='subtitle2' sx={{ color: 'text.primary' }}>
                {row.title || row.platform.title}
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
        return <Typography variant='body2'>{row.taps || 0}</Typography>
      }
    },
    {
      field: 'views',
      headerName: 'Views',
      minWidth: 150,
      renderCell: ({ row }: any) => {
        return <Typography variant='body2'>{row.views || 0}</Typography>
      }
    },
    {
      field: 'createdAt',
      headerName: 'Created At',
      minWidth: 150,
      renderCell: ({ row }: any) => <Typography variant='body2'>{row.createdAt.split('T')[0]}</Typography>
    }
  ]

  return (
    <Grid container spacing={2}>
      <Grid item xs={3}>
        <CardStatsVertical title='Link taps' stats={`${profile.taps}`} />
      </Grid>
      <Grid item xs={3}>
        <CardStatsVertical title='Card views' stats={`${profile.views}`} />
      </Grid>
      <Grid item container direction='column' gap={2} xs={12}>
        <Typography variant='subtitle1' component='h1'>
          Links Engagement
        </Typography>
        <DataTable results={data?.results} totalResults={data?.totalResults} columns={columns} setQuery={setQuery} />
      </Grid>
    </Grid>
  )
}

export default UserInsights
