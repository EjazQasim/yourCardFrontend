import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { IconButton, Menu, MenuItem, Box, Chip, Typography, Grid } from '@mui/material'
import {
  useGetMembersQuery,
  useRemoveMemberMutation,
  useUpdateMemberMutation,
  useUpdateTeamMutation
} from '@store/team'
import toast from 'react-hot-toast'
import { FaEllipsisVertical, FaLock, FaTrash, FaUnlock, FaUser } from 'react-icons/fa6'
import DataTable from '@components/tables/DataTable'
import Avatar from '@components/mui/avatar'
import { Team, User } from 'src/@core/types'
import { useAuth } from 'src/hooks/useAuth'
import { getProfileImageUrl } from 'src/@core/utils/imageUrlUtils'

interface MembersTableProps {
  user: User
  team: Team
}

const MembersTable: React.FC<MembersTableProps> = ({ user, team }) => {
  const router = useRouter()
  const { refetch } = useAuth()

  const [query, setQuery] = useState({
    page: 1,
    limit: 10
  })

  const { data, refetch: refetchMembers } = useGetMembersQuery({
    teamId: team.id,
    ...query
  })

  const [updateTeam] = useUpdateTeamMutation()
  const [removeMember] = useRemoveMemberMutation()
  const [updateMember] = useUpdateMemberMutation()

  const RowOptions: React.FC<{ member: User }> = ({ member }) => {
    const isAdmin = team.admins.includes(member.id)
    const superAdmin = team.superAdmin === member.id
    const isMe = user?.id === member.id

    const [anchorEl, setAnchorEl] = useState(null)
    const rowOptionsOpen = Boolean(anchorEl)

    if (isMe || superAdmin) {
      return <></>
    }

    const handleRowOptionsClick = (event: any) => {
      setAnchorEl(event.currentTarget)
    }

    const handleRowOptionsClose = () => {
      setAnchorEl(null)
    }

    const handleMakeAdmin = async () => {
      try {
        const updatedAdmins = [...team.admins, member.id]
        await updateTeam({ id: team.id, body: { admins: updatedAdmins } }).unwrap()
        refetch()
        toast.success('Team updated successfully')
      } catch (error: any) {
        toast.error(error?.data?.message || error.error)
      }
    }

    const handleRemoveAdmin = async () => {
      try {
        const updatedAdmins = team.admins.filter((id: string) => id !== member.id)
        await updateTeam({ id: team.id, body: { admins: updatedAdmins } }).unwrap()
        refetch()
        toast.success('Team updated successfully')
      } catch (error: any) {
        toast.error(error?.data?.message || error.error)
      }
    }

    const handleLockProfile = async () => {
      try {
        await updateMember({ teamId: team.id, body: { user: member.id, isLocked: !member.isLocked } }).unwrap()
        refetchMembers()
      } catch (error: any) {
        toast.error(error?.data?.message || error.error)
      }
    }

    const handleDelete = async () => {
      try {
        await removeMember({ teamId: team.id, body: { user: member.id } })
        refetchMembers()
      } catch (error: any) {
        toast.error(error?.data?.message || error.error)
      }
    }

    return (
      <>
        <IconButton size='small' onClick={handleRowOptionsClick}>
          <FaEllipsisVertical />
        </IconButton>
        <Menu
          keepMounted
          anchorEl={anchorEl}
          open={rowOptionsOpen}
          onClose={handleRowOptionsClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          PaperProps={{ style: { minWidth: '8rem' } }}
        >
          {team.superAdmin === user?.id && (
            <MenuItem sx={{ '& svg': { mr: 2 } }} onClick={isAdmin ? handleRemoveAdmin : handleMakeAdmin}>
              <FaUser />

              {isAdmin ? 'Remove Admin' : 'Make Admin'}
            </MenuItem>
          )}

          <MenuItem onClick={handleLockProfile} sx={{ '& svg': { mr: 2 } }}>
            {member.isLocked ? (
              <>
                <FaUnlock /> Unlock Profile
              </>
            ) : (
              <>
                <FaLock /> Lock Profile
              </>
            )}
          </MenuItem>

          <MenuItem onClick={handleDelete} sx={{ '& svg': { mr: 2 } }}>
            <FaTrash />
            Remove
          </MenuItem>
        </Menu>
      </>
    )
  }

  const columns = [
    {
      field: 'name',
      headerName: 'User',
      flex: 1,
      renderCell: ({ row: member }: any) => {
        const profile = member.live
        const isAdmin = team?.admins?.includes(member.id)
        const superAdmin = team?.superAdmin === member.id
        const isMe = user?.id === member.id

        return (
          <Box
            sx={{ display: 'flex', alignItems: 'center' }}
            onClick={() => {
              if (user && (team.admins.includes(user.id) || isMe)) {
                router.push(`/profiles/${profile.id}`)
              }
            }}
          >
            <Avatar src={getProfileImageUrl(profile)} sx={{ mr: 3, width: 34, height: 34 }} />
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography variant='subtitle2' sx={{ color: 'text.primary' }}>
                {profile?.name} {isMe && '(Me)'}{' '}
                {isAdmin && <Chip label={superAdmin ? 'Team Full Admin' : 'Admin'} size='small' />}
              </Typography>
              <Typography variant='caption' sx={{ lineHeight: 1.6667 }}>
                {member.email}
              </Typography>
            </Box>
          </Box>
        )
      }
    },
    {
      field: 'isLocked',
      headerName: 'Locked',
      minWidth: 150,
      renderCell: ({ row: member }: any) => member.isLocked && <FaLock />
    },
    {
      field: 'id',
      headerName: 'Created At',
      minWidth: 150,
      renderCell: ({ row: member }: any) => <Typography variant='body2'>{member.createdAt.split('T')[0]}</Typography>
    }
  ]

  if (user && team.admins.includes(user.id)) {
    columns.push({
      field: 'actions',
      headerName: 'Actions',
      minWidth: 150,
      renderCell: ({ row: member }: any) => <RowOptions member={member} />
    })
  }

  return (
    <Grid item xs={12}>
      {data && (
        <DataTable results={data.results} totalResults={data.totalResults} columns={columns} setQuery={setQuery} />
      )}
    </Grid>
  )
}

export default MembersTable
