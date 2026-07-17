import type { CSSProperties } from 'react'
import type { TaskKey } from '@/lib/site-config'

export type TaskTheme = {
  kicker: string
  note: string
  dark: boolean
  fontDisplay: string
  fontBody: string
  bg: string
  surface: string
  raised: string
  text: string
  muted: string
  line: string
  accent: string
  accentSoft: string
  onAccent: string
  glow: string
  radius: string
}

const DISPLAY_FONT = "'Manrope', system-ui, sans-serif"
const BODY_FONT = "'Plus Jakarta Sans', system-ui, sans-serif"

const base = {
  dark: true,
  fontDisplay: DISPLAY_FONT,
  fontBody: BODY_FONT,
  bg: '#091413',
  surface: '#10201d',
  raised: '#17302a',
  text: '#ebf7f1',
  muted: '#98b5aa',
  line: 'rgba(176, 228, 204, 0.15)',
  accent: '#408A71',
  accentSoft: 'rgba(176, 228, 204, 0.14)',
  onAccent: '#091413',
  glow: 'rgba(64,138,113,0.22)',
  radius: '1.6rem',
} satisfies Omit<TaskTheme, 'kicker' | 'note'>

export const taskThemes: Record<TaskKey, TaskTheme> = {
  article: { ...base, kicker: 'Journal', note: 'Long-form reads shaped like a modern field report.' },
  listing: { ...base, kicker: 'Directory', note: 'Clear business records with strong trust cues and clean scanning.' },
  classified: { ...base, kicker: 'Market', note: 'Fast, visual listings that surface key information first.' },
  image: { ...base, kicker: 'Gallery', note: 'Image-led browsing with immersive, portfolio-like pacing.' },
  sbm: { ...base, kicker: 'Reference', note: 'Saved links collected like a curated resource shelf.' },
  pdf: { ...base, kicker: 'Library', note: 'Documents presented as a browsable archive, not a generic file dump.' },
  profile: { ...base, kicker: 'People', note: 'Profiles that foreground identity, work, and credibility.' },
}

export function getTaskTheme(task: TaskKey): TaskTheme {
  return taskThemes[task] || taskThemes.article
}

export function taskThemeStyle(task: TaskKey): CSSProperties {
  const t = getTaskTheme(task)
  return {
    '--tk-bg': t.bg,
    '--tk-surface': t.surface,
    '--tk-raised': t.raised,
    '--tk-text': t.text,
    '--tk-muted': t.muted,
    '--tk-line': t.line,
    '--tk-accent': t.accent,
    '--tk-accent-soft': t.accentSoft,
    '--tk-on-accent': t.onAccent,
    '--tk-glow': t.glow,
    '--tk-radius': t.radius,
    '--slot4-accent': t.accent,
    '--slot4-accent-fill': t.accent,
    '--editable-font-display': t.fontDisplay,
    '--editable-font-body': t.fontBody,
    fontFamily: t.fontBody,
  } as CSSProperties
}
