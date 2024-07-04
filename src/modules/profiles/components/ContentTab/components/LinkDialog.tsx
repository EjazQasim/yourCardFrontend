import React, { useState } from 'react'
import { Dialog, DialogTitle, DialogContent, IconButton, styled } from '@mui/material'
import { Link, Platform, Profile } from 'src/@core/types'
import { FaChevronLeft, FaXmark } from 'react-icons/fa6'
import CategoryList from './CategoryList'
import LinkForm from './LinkForm'
import { isNullOrEmpty } from 'src/@core/utils/miscUtils'

interface LinkDialogProps {
  show: boolean
  setShow: React.Dispatch<React.SetStateAction<boolean>>
  link: Link | null
  links: Link[]
  profile: Profile
  setLink: React.Dispatch<React.SetStateAction<Link | null>>
}

const StyledDialog = styled(Dialog)(() => ({
  '& .MuiDialog-container': {
    alignItems: 'flex-start'
  }
}))

const StyledDialogTitle = styled(DialogTitle)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
}))

const StyledDialogContent = styled(DialogContent)(() => ({
  px: { xs: 8, sm: 15 },
  py: { xs: 8, sm: 12.5 },
  position: 'relative'
}))

const LinkDialog: React.FC<LinkDialogProps> = ({ show, setShow, profile, link, setLink, links }) => {
  const [platform, setPlatform] = useState<Platform | null>(null)

  const handleClose = () => {
    setShow(false)
    setPlatform(null)
  }

  return (
    <StyledDialog fullWidth open={show} maxWidth='md' scroll='paper' onClose={handleClose}>
      <StyledDialogTitle>
        {platform ? (
          <IconButton
            onClick={() => {
              setPlatform(null)
            }}
          >
            <FaChevronLeft />
          </IconButton>
        ) : null}
        <IconButton sx={{ marginLeft: 'auto' }} onClick={handleClose}>
          <FaXmark />
        </IconButton>
      </StyledDialogTitle>
      <StyledDialogContent>
        {!isNullOrEmpty(platform) || !isNullOrEmpty(link) ? (
          <LinkForm
            key={link ? link.id : platform?.id}
            profile={profile}
            platform={link ? link.platform : platform!}
            link={link}
            handleClose={handleClose}
          />
        ) : (
          <CategoryList links={links} setPlatform={setPlatform} setLink={setLink} />
        )}
      </StyledDialogContent>
    </StyledDialog>
  )
}

export default LinkDialog
