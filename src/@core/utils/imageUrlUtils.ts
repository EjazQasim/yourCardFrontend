import { Lead, Link, Platform, Product, Profile } from '../types'
import { BASE_URL } from 'src/configs/constants'
import { isNullOrEmpty } from './miscUtils'

const imageBaseUrl = `${BASE_URL}/v1/`

export const getProfileImageUrl = (profile?: Profile) => {
  let imageUrl = '/images/placeholders/user.png'
  if (profile && !isNullOrEmpty(profile.image)) {
    imageUrl = `${imageBaseUrl}${profile.image}`
  }

  return imageUrl
}

export const getLogoImageUrl = (profile?: Profile) => {
  let imageUrl = '/images/placeholders/logo.png'
  if (profile && !isNullOrEmpty(profile.logo)) {
    imageUrl = `${imageBaseUrl}${profile.logo}`
  }

  return imageUrl
}

export const getProfileCoverImageUrl = (profile?: Profile) => {
  let imageUrl = '/images/placeholders/cover.png'
  if (profile && !isNullOrEmpty(profile.cover)) {
    imageUrl = `${imageBaseUrl}${profile.cover}`
  }

  return imageUrl
}

export const getLeadImageUrl = (lead: Lead) => {
  let imageUrl = '/images/placeholder/user.png'
  if (lead && lead.profile && !isNullOrEmpty(lead.profile.image)) {
    imageUrl = `${imageBaseUrl}${lead.profile.image}`
  } else if (lead && !isNullOrEmpty(lead.image)) {
    imageUrl = `${imageBaseUrl}${lead.image}`
  }

  return imageUrl
}

export const getImageUrl = (image?: string) => {
  if (!isNullOrEmpty(image)) {
    return `${imageBaseUrl}${image}`
  }

  return null
}

export const getPlatformImageUrl = (platform: Platform) => {
  let imageUrl = '/images/placeholders/link.png'
  if (platform && !isNullOrEmpty(platform.image)) {
    imageUrl = `${imageBaseUrl}${platform.image}`
  }

  return imageUrl
}

export const getLinkImageUrl = (link: Link) => {
  let imageUrl = '/images/placeholders/link.png'
  if (link && !isNullOrEmpty(link?.image)) {
    imageUrl = `${imageBaseUrl}${link.image}`
  } else if (link && link.platform && !isNullOrEmpty(link.platform.image)) {
    imageUrl = `${imageBaseUrl}${link.platform.image}`
  }

  return imageUrl
}

export const getProductImageUrl = (product: Product) => {
  let imageUrl = '/images/placeholders/link.png'
  if (product && !isNullOrEmpty(product.image)) {
    imageUrl = `${imageBaseUrl}${product.image}`
  }

  return imageUrl
}

export const imageValidation = (image: File) => {
  console.log('Image Validation')
  if (!image.name.match(/\.(jpg|jpeg|png)$/)) return false

  return true
}
