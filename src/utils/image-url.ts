import imageUrlBuilder from '@sanity/image-url'
import { sanityClient } from 'sanity:client'

import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

const builder = imageUrlBuilder(sanityClient)

export function urlForImage(source: SanityImageSource) {
  return builder.image(source).auto('format').fit('max')
}
