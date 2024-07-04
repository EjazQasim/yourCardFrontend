import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { Typography, Avatar, IconButton, Stack } from '@mui/material'
import { FaChevronLeft } from 'react-icons/fa6'
import { useGetLeadQuery } from '@store/lead'
import FallbackSpinner from '@components/common/FallbackSpinner'
import LeadForm from '../components/LeadForm'
import LeadDetails from '../components/LeadDetails'
import { getLeadImageUrl } from 'src/@core/utils/imageUrlUtils'

const LeadPage = () => {
  const router = useRouter()
  const { id } = router.query

  const [isEditing, setIsEditing] = useState(false)

  const { data: lead, isLoading } = useGetLeadQuery(id, { skip: !id })

  if (isLoading) {
    return <FallbackSpinner />
  }

  return (
    <Stack gap={2}>
      <Stack direction='row' alignItems='center'>
        <IconButton
          onClick={() => {
            router.push('/leads')
          }}
        >
          <FaChevronLeft />
        </IconButton>
        <Avatar
          alt={lead?.name}
          src={getLeadImageUrl(lead)}
          sx={{
            width: 78,
            height: 78,
            border: theme => `5px solid ${theme.palette.common.white}`
          }}
        />
        <Typography variant='h5' component='h1'>
          {lead?.profile?.name || lead?.name}
        </Typography>
      </Stack>
      {isEditing ? (
        <LeadForm lead={lead} onClose={() => setIsEditing(false)} />
      ) : (
        <LeadDetails lead={lead} onEdit={() => setIsEditing(true)} />
      )}
    </Stack>
  )
}

export default LeadPage
