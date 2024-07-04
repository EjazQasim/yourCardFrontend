import React, { useCallback } from 'react'
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd'

import { Product, Profile } from 'src/@core/types'
import ProductListItem from './ProductListItem'
import { useReorderProductsMutation } from '@store/product'
import toast from 'react-hot-toast'
import { reorderItems, replaceItem } from 'src/@core/utils/arrayUtils'

interface ProductsListProps {
  products: Product[]
  profile: Profile
  handleClick: (product: Product) => void
}

const ProductsList = ({ products, profile, handleClick }: ProductsListProps) => {
  const [reorderProducts] = useReorderProductsMutation()

  const onDragEnd = useCallback(
    ({ destination, source }: DropResult) => {
      if (!destination) return
      const newItems = replaceItem(reorderItems(products, profile.id), source.index, destination.index)
      const orderedProducts = newItems.map((l: Product) => l.id)
      try {
        reorderProducts({ profileId: profile.id, body: { orderedProducts } }).unwrap()
        toast.success('Products updated successfully')
      } catch (error: any) {
        toast.error(error?.data?.message || error.error)
      }
    },
    [products, profile, reorderProducts]
  )

  return (
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
            {reorderItems(products, profile.id).map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided: any) => (
                  <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                    <ProductListItem product={item} profile={profile} handleClick={handleClick} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}

export default ProductsList
