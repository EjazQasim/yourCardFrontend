import React from 'react'
import MyPlanCard from './MyPlanCard'
import PlansTable from './PlansTable'
import { useGetMembersQuery } from '@store/team'
import { useAuth } from 'src/hooks/useAuth'

const SubscriptionTab = () => {
  const { user }: any = useAuth()
  const { data } = useGetMembersQuery(
    { teamId: user?.team?.id },
    {
      skip: !user && !user?.team?.id
    }
  )

  return (
    <>
      <MyPlanCard membersData={data} />
      <PlansTable />
    </>
  )
}

export default SubscriptionTab
