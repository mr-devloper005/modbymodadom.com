import { siteIdentity } from '@/config/site.identity'
import { getFactoryState } from '@/design/factory/get-factory-state'
import { getProductKind } from '@/design/factory/get-product-kind'

const { recipe } = getFactoryState()
const productKind = getProductKind(recipe)

export const slot4BrandConfig = {
  siteName: siteIdentity.name,
  tagline: siteIdentity.tagline,
  domain: siteIdentity.domain,
  baseUrl: siteIdentity.url,
  productKind,
  ogImage: siteIdentity.ogImage,
  accents: {
    primary: '#408A71',
    secondary: '#285A48',
    surface: '#F3FBF7',
    ink: '#091413',
  },
  typography: {
    display: 'Manrope',
    body: 'Plus Jakarta Sans',
    feel: 'geometric sans',
  },
  styleLane: 'Evergreen media gallery',
} as const
