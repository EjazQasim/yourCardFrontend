import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useCreateTeamMutation } from '@store/team'
import Spinner from '@components/common/Spinner'

const CreateTeamPage = () => {
  const router = useRouter()

  const [createTeam] = useCreateTeamMutation()

  useEffect(() => {
    if (router.query.token) {
      createTeam({ token: router.query.token }).unwrap()
    }
    router.replace('/')
  }, [router, createTeam])

  return <Spinner />
}

export default CreateTeamPage
