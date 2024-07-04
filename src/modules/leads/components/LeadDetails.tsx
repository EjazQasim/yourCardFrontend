import React from 'react'
import { useRouter } from 'next/router'
import { Grid, Card, CardContent, Button, Stack } from '@mui/material'
import { FaCopy } from 'react-icons/fa6'
import toast from 'react-hot-toast'
import Swal from 'sweetalert2'
import Link from 'next/link'
import { useLazyGetLeadContactCardQuery, useDeleteLeadMutation } from '@store/lead'
import { useLazyGetProfileContactCardQuery } from '@store/profile'
import ProfilePreviewCard from '@modules/shared/ProfilePreviewCard'
import FallbackSpinner from '@components/common/FallbackSpinner'
import { downloadBlob } from 'src/@core/utils/miscUtils'

const LeadDetails = ({ lead, onEdit }: any) => {
  const router = useRouter()

  const [getLeadContactCard] = useLazyGetLeadContactCardQuery()
  const [getProfileContactCard] = useLazyGetProfileContactCardQuery()
  const [deleteLead, { isLoading }] = useDeleteLeadMutation()

  const handleSaveContact = async () => {
    try {
      const res = lead.profile
        ? await getProfileContactCard(lead.profile.id).unwrap()
        : await getLeadContactCard(lead.id).unwrap()
      downloadBlob(res, 'contact_card.vcf', 'text/vcard; name="contact_card.vcf"')
    } catch (error: any) {
      toast.error(error?.data?.message || error.error)
    }
  }

  const handleDeleteLead = () => {
    Swal.fire({
      title: 'Warning',
      text: 'Are you sure you want to delete this lead?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then(async result => {
      if (result.isConfirmed) {
        try {
          await deleteLead(lead.id).unwrap()
          toast.success('Lead deleted successfully')
          router.replace('/leads')
        } catch (error: any) {
          toast.error(error?.data?.message || error.error)
        }
      }
    })
  }

  return (
    <Card>
      {isLoading && <FallbackSpinner />}
      <CardContent>
        <Grid container spacing={6} sx={{ height: '550px' }}>
          <Grid item xs={12} md={7} lg={8}>
            <Stack direction='row' gap={3} mb={3}>
              {!lead?.profile && (
                <Button variant='outlined' size='small' onClick={onEdit}>
                  Edit
                </Button>
              )}
              <Button variant='outlined' size='small' onClick={handleSaveContact}>
                Save as contact
              </Button>
              {lead?.email && (
                <Button variant='outlined' size='small' href={`mailto:${lead?.email}`}>
                  Email lead
                </Button>
              )}
              <Button variant='outlined' size='small' color='error' onClick={handleDeleteLead} disabled={isLoading}>
                Delete
              </Button>
            </Stack>
            <Grid container spacing={2}>
              {[
                { label: 'Name', value: lead?.profile?.name || lead?.name },
                { label: 'Email', value: lead?.email, isLink: true },
                { label: 'Date', value: lead?.createdAt?.split('T')[0] },
                { label: 'Job Title', value: lead?.profile?.jobTitle || lead?.jobTitle },
                { label: 'Company', value: lead?.profile?.company || lead?.company },
                { label: 'Location', value: lead?.profile?.location || lead?.location }
              ].map(
                (item, index) =>
                  item.value && (
                    <Grid item xs={12} md={6} key={index}>
                      <p>
                        {item.label}{' '}
                        <FaCopy
                          onClick={() => {
                            navigator.clipboard.writeText(item.value || '')
                            toast.success(`${item.label} copied`)
                          }}
                        />
                        <br />
                        <strong>
                          {item.isLink ? <Link href={`mailto:${item.value}`}>{item.value}</Link> : item.value}
                        </strong>
                      </p>
                    </Grid>
                  )
              )}
            </Grid>
          </Grid>
          <Grid item xs={12} md={5} lg={4}>
            {lead && <ProfilePreviewCard profile={lead?.profile || lead} />}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default LeadDetails
