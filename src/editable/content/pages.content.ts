import { slot4BrandConfig } from '@/editable/theme/brand.config'

export const pagesContent = {
  home: {
    metadata: {
      title: 'Visual profiles, image collections, and polished discovery',
      description: 'Browse image-led posts and profile pages through a refined visual directory built for discovery.',
      openGraphTitle: 'Visual profiles, image collections, and polished discovery',
      openGraphDescription: 'Explore creator profiles, gallery posts, and standout visuals in one evergreen discovery experience.',
      keywords: ['image showcase', 'profile discovery', 'visual collections', 'gallery platform'],
    },
    hero: {
      badge: 'Curated visual discovery',
      title: ['Profiles worth following,', 'images worth opening.'],
      description: 'A gallery-first publishing surface for browsing image collections, discovering profiles, and moving through visual work with less friction.',
      primaryCta: { label: 'Explore profiles', href: '/profile' },
      secondaryCta: { label: 'Open galleries', href: '/image' },
      searchPlaceholder: 'Search people, image sets, topics, or categories',
      focusLabel: 'Focus',
      featureCardBadge: 'Featured collection',
      featureCardTitle: 'Fresh image-led posts set the rhythm for the homepage.',
      featureCardDescription: 'The home experience leads with visuals and identity, then opens into deeper archive browsing.',
    },
    intro: {
      badge: 'Why this format works',
      title: 'Designed for people who browse visually before they commit.',
      paragraphs: [
        'This site behaves like a visual discovery platform first, not a dense publishing feed.',
        'Profiles and image posts stay connected so visitors can move from a person to their work, then into adjacent collections without losing context.',
        'The experience is intentionally calm, direct, and image-forward across every route.',
      ],
      sideBadge: 'What visitors get',
      sidePoints: [
        'Gallery-first browsing shaped around image and profile content.',
        'Clear transitions between creators, visual posts, and archive views.',
        'Strong metadata cues without turning the interface into a dashboard.',
        'Responsive layouts that feel intentional on mobile and desktop.',
      ],
      primaryLink: { label: 'Browse profiles', href: '/profile' },
      secondaryLink: { label: 'See image archive', href: '/image' },
    },
    cta: {
      badge: 'Publish visually',
      title: 'Share a profile, publish a gallery, or put new work into circulation.',
      description: 'Use the publishing workspace to add image-led posts and profile content through the same clear interface.',
      primaryCta: { label: 'Open Publishing', href: '/create' },
      secondaryCta: { label: 'Contact', href: '/contact' },
    },
    taskSection: {
      heading: 'Latest {label}',
      descriptionSuffix: 'Browse the newest posts in this section.',
    },
  },
  about: {
    badge: 'About',
    title: 'A calmer showcase for people, visuals, and connected publishing.',
    description: `${slot4BrandConfig.siteName} is built to make image-led browsing and profile discovery feel deliberate, polished, and easy to trust.`,
    paragraphs: [
      'The site brings visual posts and profile pages into one consistent public experience so visitors can browse work and the people behind it together.',
      'Instead of overloading the interface with utility chrome, the design keeps attention on the image, the summary, and the next useful move.',
    ],
    values: [
      {
        title: 'Visual clarity',
        description: 'Images, titles, and summaries are given enough room to feel intentional instead of crowded.',
      },
      {
        title: 'Identity up front',
        description: 'Profile pages and related content make authors, studios, and brands easier to understand at a glance.',
      },
      {
        title: 'Connected discovery',
        description: 'Visitors can move naturally from archive pages to detail pages to related collections without losing their place.',
      },
    ],
  },
  contact: {
    eyebrow: `Contact ${slot4BrandConfig.siteName}`,
    title: 'Tell us what you want to publish, feature, or improve.',
    description: 'Use this page for publishing questions, profile updates, gallery support, or partnership conversations. We keep requests simple and route them to the right lane.',
    formTitle: 'Send your note',
  },
  search: {
    metadata: {
      title: 'Search',
      description: 'Search profiles, image posts, and related content across the site.',
    },
    hero: {
      badge: 'Search the collection',
      title: 'Find creators, visuals, and archive pages quickly.',
      description: 'Use keywords, categories, and content types to move through the site without digging through endless grids.',
      placeholder: 'Search by title, person, category, or subject',
    },
    resultsTitle: 'Fresh searchable content',
  },
  create: {
    metadata: {
      title: 'Create',
      description: 'Create and submit new content for the site.',
    },
    locked: {
      badge: 'Member publishing',
      title: 'Sign in to open the publishing workspace.',
      description: 'Use your account to submit galleries, profile updates, and other active content types through the editable publishing flow.',
    },
    hero: {
      badge: 'Publishing workspace',
      title: 'Create polished posts for the live site.',
      description: 'Choose a supported content type, add the essentials, and save a structured draft that fits the current visual system.',
    },
    formTitle: 'Post details',
    submitLabel: 'Save draft',
    successTitle: 'Draft saved successfully.',
  },
  auth: {
    login: {
      metadataDescription: 'Login page for this site.',
      badge: 'Member access',
      title: 'Return to your publishing account.',
      description: 'Sign in to keep managing drafts, profile information, and new visual posts from one place.',
      formTitle: 'Login',
      submitLabel: 'Continue',
      noAccount: 'We could not match those details. Create an account first, then try again.',
      success: 'Login successful. Redirecting...',
      createCta: 'Create an account',
    },
    signup: {
      metadataDescription: 'Signup page for this site.',
      badge: 'Create access',
      title: 'Open your account and start publishing.',
      description: 'Create an account to access the publishing workspace, save your details, and submit supported content.',
      formTitle: 'Create account',
      submitLabel: 'Create account',
      passwordShort: 'Use at least 4 characters for the password.',
      success: 'Account created successfully. Redirecting...',
      loginCta: 'Login',
    },
  },
  detailPages: {
    article: {
      relatedTitle: 'Related articles',
      fallbackTitle: 'Article details',
    },
    listing: {
      relatedTitle: 'Related listings',
      fallbackTitle: 'Listing details',
    },
    image: {
      relatedTitle: 'Related visuals',
      fallbackTitle: 'Image details',
    },
    profile: {
      relatedTitle: 'Related profiles',
      fallbackDescription: 'Profile details will appear here once available.',
      visitButton: 'Visit Official Site',
    },
  },
} as const
