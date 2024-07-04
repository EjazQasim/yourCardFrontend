import { Profile } from './profile'

export interface Lead {
  id: string
  user?: string
  profile?: Profile
  name?: string
  email?: string
  phone?: string
  jobTitle?: string
  company?: string
  notes?: string
  location?: string
  website?: string
  image?: string
  cover?: string
  logo?: string
  latitude?: number
  longitude?: number
  createdAt?: string
}
