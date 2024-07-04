export interface Product {
  id: string
  profile: string
  title: string
  image?: string
  description?: string
  url?: string
  price?: string
  taps?: number
  position?: number
  locked?: boolean
}

export interface ProductParams {
  profile?: string
  title: string
  price?: string
  url?: string
  description?: string
  image?: any
}

export interface UpdateProductParams {
  id: string
  data: ProductParams
}

export interface ReorderProductsParams {
  profileId: string
  orderedProducts: string[]
}
