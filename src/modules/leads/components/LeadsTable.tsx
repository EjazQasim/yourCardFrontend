import React, { useState } from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'
import CustomAvatar from 'src/@core/components/mui/avatar'
import { useAuth } from 'src/hooks/useAuth'
import DataTable from '@components/tables/DataTable'
import { Button } from '@mui/material'
import { useRouter } from 'next/router'
import { useGetMyLeadsQuery } from '@store/lead'
import { useGetTeamLeadsQuery } from '@store/team'
import { getLeadImageUrl, getProfileImageUrl } from 'src/@core/utils/imageUrlUtils'

const LeadsTable: React.FC = () => {
  const router = useRouter()
  const { user } = useAuth()
  const [query, setQuery] = useState({
    page: 1,
    limit: 10
  })

  const { data: leads } = useGetMyLeadsQuery(query, { skip: user?.team || user?.team?.admins.includes(user?.id) })
  const { data: teamLeads } = useGetTeamLeadsQuery(
    { teamId: user?.team?.id, ...query },
    {
      skip: !user?.team || !user?.team?.admins.includes(user?.id)
    }
  )

  const data = leads || teamLeads

  const columns = [
    {
      field: 'name',
      headerName: 'Connection',
      flex: 2,
      renderCell: ({ row }: any) => {
        const name = row.profile?.name || row.name
        const email = row.profile?.email || row.email

        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <CustomAvatar src={getLeadImageUrl(row)} sx={{ mr: 3, width: 34, height: 34 }} />
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography variant='subtitle2' sx={{ color: 'text.primary' }}>
                {name}
              </Typography>
              <Typography variant='caption' sx={{ lineHeight: 1.6667 }}>
                {email}
              </Typography>
            </Box>
          </Box>
        )
      }
    },
    ...(user?.team
      ? [
          {
            field: 'connectedWith',
            headerName: 'Connected with',
            flex: 1,
            renderCell: ({ row }: any) => {
              return (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <AvatarGroup total={1}>
                    <Avatar alt='Remy Sharp' src={getProfileImageUrl(row.user.live)} />
                  </AvatarGroup>
                </Box>
              )
            }
          }
        ]
      : []),
    {
      field: 'createdAt',
      headerName: 'Date',
      minWidth: 150,
      renderCell: ({ row }: any) => <Typography variant='body2'>{row.createdAt?.split('T')[0]}</Typography>
    },
    {
      field: 'id',
      headerName: '',
      minWidth: 150,
      renderCell: ({ row }: any) => (
        <Button
          variant='outlined'
          onClick={() => {
            router.push(`/leads/${row.id}`)
          }}
          size='small'
        >
          View Lead
        </Button>
      )
    }
  ]

  return <DataTable results={data?.results} totalResults={data?.totalResults} columns={columns} setQuery={setQuery} />
}

export default LeadsTable
