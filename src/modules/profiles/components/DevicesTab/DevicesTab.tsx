import React, { useState } from 'react'
import { Grid, List, ListItem } from '@mui/material'
import { useGetTagsQuery } from '@store/tag'
import TagCard from './components/TagCard'
import TagDialog from './components/TagDialog'
import { Tag } from 'src/@core/types'

const DevicesTab = ({ user }: any) => {
  const { data } = useGetTagsQuery({ user: user, limit: 100 })

  const [showTagDialog, setShowTagDialog] = useState(false)
  const [selectedTag, setSelectedTag] = useState<Tag | null>(null)
  const [formKey, setFormKey] = useState(1)

  const handleCloseTagDialog = () => {
    setShowTagDialog(false)
    setSelectedTag(null)
  }

  const handleTagClick = (tag: Tag) => {
    setFormKey(Math.random())
    setSelectedTag(tag)
    setShowTagDialog(true)
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} md={7} lg={8}>
        <List className='scroll'>
          {data?.results?.map(tag => (
            <ListItem key={tag.id}>
              <TagCard tag={tag} handleClick={handleTagClick} />
            </ListItem>
          ))}
        </List>
      </Grid>
      <Grid item xs={12} md={5} lg={4}></Grid>
      {selectedTag && <TagDialog key={formKey} show={showTagDialog} setShow={handleCloseTagDialog} tag={selectedTag} />}
    </Grid>
  )
}

export default DevicesTab
