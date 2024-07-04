import { Profile } from './profile'
import { Team } from './team'

export interface User {
  id: string
  role: string
  isEmailVerified?: boolean
  fcmToken?: string
  isLocked?: boolean
  email: string
  username?: string
  createdAt?: string
  live: Profile
  team?: Team
}
