import React, { useState } from 'react'
import { Box, Button, Grid } from '@mui/material'
import { Link } from 'src/@core/types'
import ProfilePreviewCard from '@modules/shared/ProfilePreviewCard'
import LinksList from './components/LinksList'
import LinkDialog from './components/LinkDialog'

const MasterContentTab = ({ profile, links, products }: any) => {
  const [showLinkDialog, setShowLinkDialog] = useState(false)
  const [selectedLink, setSelectedLink] = useState<Link | null>(null)

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

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12} md={7} lg={8}>
          <Box sx={{ mb: 3, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
            <div></div>
            <Button variant='contained' onClick={() => setShowLinkDialog(true)} size='small'>
              Add Link
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

export default MasterContentTab
