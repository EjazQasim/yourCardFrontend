import React, { useState } from 'react'
import { Box, Button, FormControlLabel, FormGroup, Grid, Switch } from '@mui/material'
import { Link } from 'src/@core/types'
import ProfilePreviewCard from '@modules/shared/ProfilePreviewCard'
import toast from 'react-hot-toast'
import { useUpdateProfileMutation } from '@store/profile'
import LinksList from './components/LinksList'
import LinkDialog from './components/LinkDialog'
import Spinner from '@components/common/Spinner'
import { useAuth } from 'src/hooks/useAuth'
import { reorderItems } from 'src/@core/utils/arrayUtils'

const ContentTab = ({ profile, links, products }: any) => {
  const { user } = useAuth()

  const [showLinkDialog, setShowLinkDialog] = useState(false)
  const [selectedLink, setSelectedLink] = useState<Link | null>(null)

  const [updateProfile, { isLoading }] = useUpdateProfileMutation()

  const handleCloseLinkDialog = () => {
    setShowLinkDialog(false)
    setSelectedLink(null)
  }

  const handleLinkClick = (link: Link) => {
    if (profile?.id === link.profile) {
      setSelectedLink(link)
      setShowLinkDialog(true)
    }
  }

  const handleDirectChange = async () => {
    if (links && links.length > 0) {
      try {
        const direct = reorderItems(links, profile.id)[0]
        await updateProfile({ id: profile?.id, body: { directOn: !profile?.directOn, direct: direct.id } }).unwrap()
      } catch (error: any) {
        toast.error(error?.data?.message || error.error)
      }
    } else {
      toast.error('Please add links')
    }
  }

  const handleLeadCaptureChange = async () => {
    try {
      await updateProfile({ id: profile?.id, body: { leadCapture: !profile?.leadCapture } }).unwrap()
    } catch (error: any) {
      toast.error(error?.data?.message || error.error)
    }
  }

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12} md={7} lg={8}>
          <Box sx={{ mb: 3, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
            <FormGroup row>
              {(user?.team || user?.isPro) && (
                <FormControlLabel
                  control={<Switch checked={profile?.leadCapture} onChange={handleLeadCaptureChange} size='small' />}
                  label='Lead capture'
                />
              )}
              <FormControlLabel
                control={<Switch checked={profile?.directOn} onChange={handleDirectChange} size='small' />}
                label='Direct'
              />
            </FormGroup>
            <Button variant='contained' onClick={() => setShowLinkDialog(true)} size='small' disabled={isLoading}>
              {isLoading ? <Spinner /> : 'Add Link'}
            </Button>
          </Box>
          <LinksList links={links} profile={profile} handleClick={handleLinkClick} />
        </Grid>
        <Grid item xs={12} md={5} lg={4}>
          <ProfilePreviewCard profile={profile} links={links} products={products} />
        </Grid>
      </Grid>
      <LinkDialog
        show={showLinkDialog}
        setShow={handleCloseLinkDialog}
        setLink={setSelectedLink}
        link={selectedLink}
        links={links}
        profile={profile}
      />
    </>
  )
}

export default ContentTab
