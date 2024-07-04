export const replaceItem = (items: any, from: number, to: number) => {
  if (from < 0 || from >= items.length || to < 0 || to >= items.length) {
    // Invalid from or to index, return the original list unchanged
    return items
  }
  const updatedList = [...items] // Create a copy of the original list

  // Remove the item at the 'from' index and store it in a variable
  const [removedItem] = updatedList.splice(from, 1)

  // Insert the removed item at the 'to' index
  updatedList.splice(to, 0, removedItem)

  return updatedList
}

export const reorderItems = (items: any, id?: string) => {
  if (!items) {
    return []
  }

  const sortedArray = [...items].sort((a, b) => {
    if (id && a.profile !== id) {
      return -1 // Item with the specified id should come first
    }
    if (a.position === undefined && b.position === undefined) {
      return 0 // Both items have undefined position, consider them equal
    }
    if (a.position === undefined) {
      return 1 // Item `a` has undefined position, so it should come after `b`
    }
    if (b.position === undefined) {
      return -1 // Item `b` has undefined position, so it should come before `a`
    }

    return a.position - b.position // Sort by position in ascending order
  })

  return sortedArray
}
