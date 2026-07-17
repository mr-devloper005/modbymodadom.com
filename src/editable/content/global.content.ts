import { slot4BrandConfig } from '@/editable/theme/brand.config'

export const globalContent = {
  site: {
    name: slot4BrandConfig.siteName,
    tagline: slot4BrandConfig.tagline || 'Visual publishing and profile discovery',
    domain: slot4BrandConfig.domain,
    baseUrl: slot4BrandConfig.baseUrl,
  },
  nav: {
    tagline: 'Visual publishing and profile discovery',
    primaryLinks: [
      { label: 'Galleries', href: '/image' },
      { label: 'Search', href: '/search' },
      { label: 'About', href: '/about' },
    ],
    actions: {
      primary: { label: 'Open Publishing', href: '/create' },
      secondary: { label: 'Contact', href: '/contact' },
    },
  },
  footer: {
    tagline: 'Profiles, galleries, and connected discovery',
    description: 'A gallery-first public site built for browsing image posts, profiles, and connected archive pages through one polished interface.',
    columns: [
      {
        title: 'Browse',
        links: [
          { label: 'Images', href: '/image' },
          { label: 'Search', href: '/search' },
          { label: 'Create', href: '/create' },
        ],
      },
      {
        title: 'Site',
        links: [
          { label: 'About', href: '/about' },
          { label: 'Contact', href: '/contact' },
          { label: 'Login', href: '/login' },
        ],
      },
    ],
    bottomNote: 'Built for clean visual discovery and consistent publishing.',
  },
  commonLabels: {
    readMore: 'Read more',
    viewAll: 'View all',
    explore: 'Explore',
    latest: 'Latest',
    related: 'Related',
    published: 'Published',
  },
} as const
