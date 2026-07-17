import type { TaskKey } from '@/lib/site-config'

export type TaskPageVoice = {
  eyebrow: string
  headline: string
  description: string
  filterLabel: string
  secondaryNote: string
  chips: string[]
}

export const taskPageVoices = {
  article: {
    eyebrow: 'Reading room',
    headline: 'Long-form stories with a slower, cleaner editorial rhythm.',
    description: 'Article pages keep the same visual language as the rest of the site, but give text the space and pacing it needs.',
    filterLabel: 'Choose article topic',
    secondaryNote: 'Prioritize readable hierarchy, comfortable spacing, and clear onward paths.',
    chips: ['Long reads', 'Editorial pacing', 'Clean typography'],
  },
  classified: {
    eyebrow: 'Fast-moving offers',
    headline: 'Classified posts that surface price, urgency, and the next action fast.',
    description: 'These archive pages should read quickly, stay visual, and keep important metadata close to the title.',
    filterLabel: 'Filter classified category',
    secondaryNote: 'Make action and clarity feel immediate.',
    chips: ['Quick scan', 'Visual cues', 'Direct contact'],
  },
  sbm: {
    eyebrow: 'Saved references',
    headline: 'Bookmarks arranged like curated resource shelves.',
    description: 'Resource posts should feel organized and useful, with enough metadata to build trust before the click.',
    filterLabel: 'Filter collection',
    secondaryNote: 'Treat each link like a considered recommendation.',
    chips: ['Reference shelf', 'Collections', 'Curated links'],
  },
  profile: {
    eyebrow: 'People and studios',
    headline: 'Profiles with identity, work context, and stronger credibility cues.',
    description: 'Profile pages should make individuals and brands feel legible before the archive begins.',
    filterLabel: 'Filter profile category',
    secondaryNote: 'Show identity before volume.',
    chips: ['Identity first', 'Trust cues', 'Connected work'],
  },
  pdf: {
    eyebrow: 'Document archive',
    headline: 'Files and PDFs presented as a browsable, useful library.',
    description: 'Documents should feel structured and intentional instead of dropping into the same pattern as normal posts.',
    filterLabel: 'Filter document type',
    secondaryNote: 'Emphasize file purpose, archive context, and clear download paths.',
    chips: ['Archive', 'Documents', 'Reference material'],
  },
  listing: {
    eyebrow: 'Directory view',
    headline: 'Business listings designed for fast comparison and clear trust signals.',
    description: 'Listing pages should stay highly scannable while still fitting the site’s premium visual language.',
    filterLabel: 'Filter business category',
    secondaryNote: 'Help people compare quickly without flattening everything into a spreadsheet.',
    chips: ['Compare', 'Directory', 'Trust signals'],
  },
  image: {
    eyebrow: 'Photo collection',
    headline: 'Recent image posts and visual updates.',
    description: 'Browse image posts in a simple, clean archive with enough context to understand each update quickly.',
    filterLabel: 'Filter visual category',
    secondaryNote: 'Let the imagery carry the first impression.',
    chips: ['Gallery first', 'Image-led', 'Collection browsing'],
  },
} satisfies Record<TaskKey, TaskPageVoice>
