import Profile from '@modules/profiles/components/Profile'
import { useRouter } from 'next/router'
import React from 'react'

const EditProfilePage: React.FC = () => {
  const router = useRouter()
  const { id } = router.query

  return <Profile id={id} />
}

export default EditProfilePage
