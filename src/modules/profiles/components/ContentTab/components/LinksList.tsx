import React, { useCallback } from 'react'
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd'
import { Link, Profile } from 'src/@core/types'
import { useReorderLinksMutation } from '@store/link'
import toast from 'react-hot-toast'
import LinkListItem from './LinkListItem'
import { reorderItems, replaceItem } from 'src/@core/utils/arrayUtils'

interface LinksListProps {
  links?: Link[]
  profile: Profile
  handleClick?: (link: Link) => void
  type?: string
}

const LinksList = ({ links, profile, handleClick, type = 'default' }: LinksListProps) => {
  const [reorderLinks] = useReorderLinksMutation()
  const onDragEnd = useCallback(
    ({ destination, source }: DropResult) => {
      if (!destination) return
      const newItems = replaceItem(reorderItems(links, profile.id), source.index, destination.index)

      const orderedLinks = newItems.map((l: Link) => l.id)

      try {
        reorderLinks({ profileId: profile.id, body: { orderedLinks } })
        toast.success('Products updated successfully')
      } catch (error: any) {
        toast.error(error?.data?.message || error.error)
      }
    },
    [reorderLinks, links, profile]
  )

  return (
    <>
      {type === 'contact' ? (
        <div
          style={{
            overflowY: 'auto',
            scrollbarWidth: 'thin',
            maxHeight: '650px',
            scrollbarColor: 'transparent transparent'
          }}
        >
          {reorderItems(links, profile.id).map(item => (
            <div key={item.id}>
              <div>
                <LinkListItem link={item} profile={profile} handleClick={handleClick} type={'contact'} />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId='board'>
            {(provided: any) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                style={{
                  overflowY: 'auto',
                  scrollbarWidth: 'thin',
                  maxHeight: '650px',
                  scrollbarColor: 'transparent transparent'
                }}
              >
                {reorderItems(links, profile.id).map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided: any) => (
                      <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        <LinkListItem link={item} profile={profile} handleClick={handleClick} />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      )}
    </>
  )
}

export default LinksList
