export interface Category {
  id: string
  name?: string
  platforms?: Platform[]
}

export interface Platform {
  id: string
  title?: string
  headline?: string
  image?: string
  type?: string
}
