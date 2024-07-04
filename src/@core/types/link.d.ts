import { Platform } from './category'

export interface Link {
  id: string
  profile: string
  title?: string
  headline?: string
  value?: string
  data?: string
  image?: string
  taps?: number
  status?: boolean
  isContact?: boolean
  url?: boolean
  platform: Platform
  position: number
}
