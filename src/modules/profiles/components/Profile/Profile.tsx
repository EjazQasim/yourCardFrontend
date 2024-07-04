import React, { useState } from 'react'
import { Grid, Typography, Avatar, Card, CardContent, IconButton, Tab, Theme } from '@mui/material'
import { useRouter } from 'next/router'
import { FaChevronLeft } from 'react-icons/fa6'
import { useGetProfileQuery } from '@store/profile'
import { TabList, TabPanel, TabContext } from '@mui/lab'

import { useGetProductsQuery } from '@store/product'
import { useGetLinksQuery } from '@store/link'

import Spinner from '@components/common/Spinner'
import AboutTab from '../AboutTab'
import MasterAboutTab from '../AboutTab/MasterAboutTab'
import ContentTab from '../ContentTab'
import MasterContentTab from '../ContentTab/MasterContentTab'
import ProductsTab from '../ProductsTab'
import DevicesTab from '../DevicesTab'
import { useAuth } from 'src/hooks/useAuth'
import { getLeadImageUrl } from 'src/@core/utils/imageUrlUtils'

const Profile = ({ id }: any) => {
  const router = useRouter()
  const { user } = useAuth()

  const [tabValue, setTabValue] = useState('about')

  const { data: profile, isLoading: profileLoading } = useGetProfileQuery(id, { skip: !id })

  const { data: linksData } = useGetLinksQuery({ profile: profile?.id, limit: 100 }, { skip: !profile })
  const { data: productsData } = useGetProductsQuery(
    { profile: profile?.id, limit: 100 },
    { skip: !profile || id === 'add' }
  )

  const handleTabsChange = (_event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue)
  }

  return (
    <Grid container spacing={6}>
      <Grid item container alignItems='center'>
        <IconButton
          onClick={() => {
            router.push('/home')
          }}
        >
          <FaChevronLeft />
        </IconButton>
        {id ? (
          profileLoading ? (
            <Spinner />
          ) : profile && profile.user ? (
            <>
              <Avatar
                alt={profile?.name}
                src={getLeadImageUrl(profile)}
                sx={{
                  width: 78,
                  height: 78,
                  border: theme => `5px solid ${theme.palette.common.white}`
                }}
              />
              <Typography variant='h5' component='h1'>
                {profile?.name}
              </Typography>
            </>
          ) : (
            <Typography variant='body1' color='red' component='h1' sx={{ m: 'auto' }}>
              Note: All items added to this profile will push through to all users
            </Typography>
          )
        ) : (
          ''
        )}
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <TabContext value={tabValue}>
              <div style={{ display: 'flex' }}>
                {id ? (
                  <TabList
                    orientation='vertical'
                    onChange={handleTabsChange}
                    sx={{
                      minWidth: '200px',
                      borderRight: (theme: Theme) => `1px solid ${theme.palette.divider}`
                    }}
                  >
                    <Tab value='about' label='About' />
                    <Tab value='content' label='Content' />
                    {(user?.team || user?.isPro) && <Tab value='products' label={profile?.category || 'Products'} />}
                    {profile?.user && <Tab value='devices' label='Devices' />}
                  </TabList>
                ) : (
                  <TabList
                    orientation='vertical'
                    onChange={handleTabsChange}
                    sx={{
                      minWidth: '200px',
                      borderRight: (theme: Theme) => `1px solid ${theme.palette.divider}`
                    }}
                  >
                    <Tab value='about' label='About' />
                  </TabList>
                )}

                <div
                  style={{
                    flexGrow: 1,
                    height: '700px'
                  }}
                >
                  {id ? (
                    <>
                      <TabPanel value='about'>
                        {profile &&
                          (profile.user ? (
                            <AboutTab
                              key={profile.id}
                              profile={profile}
                              links={linksData?.results}
                              products={productsData?.results}
                            />
                          ) : (
                            <MasterAboutTab
                              key={profile.id}
                              profile={profile}
                              links={linksData?.results}
                              products={productsData?.results}
                            />
                          ))}
                      </TabPanel>
                      <TabPanel value='content'>
                        {profile &&
                          (profile.user ? (
                            <ContentTab profile={profile} links={linksData?.results} products={productsData?.results} />
                          ) : (
                            <MasterContentTab
                              profile={profile}
                              links={linksData?.results}
                              products={productsData?.results}
                            />
                          ))}
                      </TabPanel>

                      <TabPanel value='products'>
                        <ProductsTab profile={profile} links={linksData?.results} products={productsData?.results} />
                      </TabPanel>
                    </>
                  ) : (
                    <TabPanel value='about'>
                      <AboutTab />
                    </TabPanel>
                  )}

                  <TabPanel value='devices'>{profile?.user && <DevicesTab user={profile?.user} />}</TabPanel>
                </div>
              </div>
            </TabContext>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default Profile
