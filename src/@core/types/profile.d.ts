import { Link } from './link'

export interface Profile {
  id: string
  name?: string
  location?: string
  jobTitle?: string
  views?: number
  taps?: number
  direct?: Link
  directOn?: boolean
  leadCapture?: boolean
  title?: string
  company?: string
  image?: string
  cover?: string
  logo?: string
  themeColor?: string
  isConnected?: boolean
  user?: string
  bio?: string
  category?: string
}
