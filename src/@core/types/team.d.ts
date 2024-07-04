import { Profile } from './profile'

export interface Team {
  admins: string[]
  name?: string
  superAdmin: string
  createdAt?: string
  id: string
  profile?: Profile
}
