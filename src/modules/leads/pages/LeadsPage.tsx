import React from 'react'
import { Typography, Button, Stack } from '@mui/material'
import { useLazyExportLeadsQuery } from '@store/user'
import { useAuth } from 'src/hooks/useAuth'
import LeadsTable from '../components/LeadsTable'
import { downloadBlob } from 'src/@core/utils/miscUtils'

const LeadsPage: React.FC = () => {
  const { user } = useAuth()

  const [exportLeads] = useLazyExportLeadsQuery()

  const handleExportLeads = async () => {
    try {
      const res: any = await exportLeads(user.id).unwrap()
      downloadBlob(res, 'leads.csv', 'text/csv; name="leads.csv"')
    } catch (error) {
      console.log('ERROR', error)
    }
  }

  return (
    <Stack gap={2}>
      <Stack direction='row' justifyContent='space-between' alignItems='center'>
        <Typography variant='h5' component='h1'>
          Leads
        </Typography>
        <Button
          variant='contained'
          onClick={handleExportLeads}
          sx={{
            borderRadius: '24px',
            marginLeft: 'auto'
          }}
        >
          Export
        </Button>
      </Stack>
      <LeadsTable />
    </Stack>
  )
}

export default LeadsPage
