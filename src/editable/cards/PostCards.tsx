import Link from 'next/link'
import { ArrowRight, Clock3, Image as ImageIcon } from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { TaskKey } from '@/lib/site-config'
import { editableDesignContract as dc, editablePalette as pal } from '@/editable/layouts/design-contract'

const PLACEHOLDER = '/placeholder.svg?height=900&width=1400'

export function getEditablePostImage(post?: SitePost | null) {
  const media = Array.isArray(post?.media) ? post.media : []
  const mediaUrl = media.find((item) => typeof item?.url === 'string' && item.url)?.url
  const content = post?.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  const images = Array.isArray(content.images) ? content.images : []
  const contentImage = images.find((url): url is string => typeof url === 'string' && Boolean(url))
  const logo = typeof content.logo === 'string' ? content.logo : ''
  const image = typeof content.image === 'string' ? content.image : ''
  const thumbnail = typeof content.thumbnail === 'string' ? content.thumbnail : ''
  return mediaUrl || contentImage || image || thumbnail || logo || PLACEHOLDER
}

export function toPlainText(value: unknown): string {
  if (typeof value !== 'string') return ''
  return value
    .replace(/<(script|style)[^>]*>[\s\S]*?<\/\1>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&#0?39;|&apos;/gi, "'")
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

export function getEditableExcerpt(post?: SitePost | null, limit = 150) {
  const content = post?.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  const raw =
    (typeof content.description === 'string' && content.description) ||
    (typeof content.summary === 'string' && content.summary) ||
    (typeof post?.summary === 'string' && post.summary) ||
    (typeof content.body === 'string' && content.body) ||
    (typeof content.excerpt === 'string' && content.excerpt) ||
    ''
  const clean = toPlainText(raw)
  return clean.length > limit ? `${clean.slice(0, limit).trim()}...` : clean
}

export function getEditableCategory(post?: SitePost | null) {
  const content = post?.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  return (typeof content.category === 'string' && content.category) || post?.tags?.[0] || 'Featured'
}

export function getEditableAuthor(post?: SitePost | null) {
  const content = post?.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  return (typeof content.author === 'string' && content.author) || (typeof content.name === 'string' && content.name) || 'Guest contributor'
}

export function getEditableDate(post?: SitePost | null) {
  const value = post?.publishedAt || post?.createdAt || post?.updatedAt || ''
  if (!value) return 'Recently updated'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return 'Recently updated'
  return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(date)
}

export function postHref(task: TaskKey, post: SitePost, route = `/${task}`) {
  return `${route}/${post.slug}`
}

function MetaRow({ post }: { post?: SitePost | null }) {
  return (
    <div className={`flex flex-wrap items-center gap-x-3 gap-y-1 text-xs ${pal.mutedText}`}>
      <span>{getEditableAuthor(post)}</span>
      <span className="h-1 w-1 rounded-full bg-current/40" />
      <span>{getEditableDate(post)}</span>
    </div>
  )
}

type CardProps = {
  post: SitePost
  href: string
  label?: string
  index?: number
}

export function FeaturedPostCard({ post, href, label = 'Featured collection' }: CardProps) {
  const image = getEditablePostImage(post)
  return (
    <Link href={href} className={`group block overflow-hidden ${dc.surface.dark} ${dc.motion.lift}`}>
      <div className="relative min-h-[520px] p-6 sm:p-8 lg:min-h-[620px]">
        <img src={image} alt={post.title || 'Featured post'} className="absolute inset-0 h-full w-full object-cover opacity-70 transition duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,10,9,0.1),rgba(3,10,9,0.88))]" />
        <div className="relative z-10 flex h-full flex-col justify-end">
          <span className={`${dc.type.eyebrow} text-[var(--slot4-cream)]/86`}>{label}</span>
          <h3 className="mt-5 max-w-3xl text-4xl font-semibold leading-[0.95] tracking-[-0.07em] text-white sm:text-5xl lg:text-6xl">
            {post.title || 'Untitled post'}
          </h3>
          <p className="mt-5 max-w-2xl text-sm leading-8 text-white/78 sm:text-base">{getEditableExcerpt(post, 190) || 'Open the post to see the full details and related work.'}</p>
          <div className="mt-6">
            <MetaRow post={post} />
          </div>
          <span className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-[var(--slot4-cream)] px-5 py-3 text-sm font-bold text-[var(--slot4-on-accent)]">
            Open feature <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  )
}

export function CompactPostCard({ post, href, index = 0 }: CardProps) {
  return (
    <Link href={href} className={`group block min-w-0 ${dc.surface.soft} p-5 ${dc.motion.lift}`}>
      <div className="flex items-start gap-4">
        <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${pal.accentSoftBg} text-xs font-bold ${pal.accentText}`}>
          {String(index + 1).padStart(2, '0')}
        </span>
        <div className="min-w-0">
          <p className={`flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] ${pal.accentText}`}>
            <Clock3 className="h-3.5 w-3.5" /> {getEditableCategory(post)}
          </p>
          <h3 className={`mt-2 line-clamp-2 text-xl font-semibold leading-tight tracking-[-0.04em] ${pal.panelText}`}>{post.title || 'Untitled post'}</h3>
          <p className={`mt-2 line-clamp-3 text-sm leading-6 ${pal.softMutedText}`}>{getEditableExcerpt(post, 110) || 'Details will appear here once this post has summary content.'}</p>
        </div>
      </div>
    </Link>
  )
}

export function HorizontalPostCard({ post, href, index = 0 }: CardProps) {
  const image = getEditablePostImage(post)
  return (
    <Link href={href} className={`group grid min-w-0 gap-5 overflow-hidden ${dc.surface.card} p-4 ${dc.motion.lift} sm:grid-cols-[240px_minmax(0,1fr)]`}>
      <div className={`${dc.media.frame} aspect-[16/12] sm:aspect-auto sm:min-h-[210px]`}>
        <img src={image} alt={post.title || 'Post image'} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
      </div>
      <div className="min-w-0 py-2 pr-2 sm:py-4 sm:pr-5">
        <p className={`${dc.type.eyebrow} ${pal.accentText}`}>Browse {String(index + 1).padStart(2, '0')}</p>
        <h2 className={`mt-3 line-clamp-3 text-2xl font-semibold leading-tight tracking-[-0.05em] ${pal.panelText} sm:text-3xl`}>{post.title || 'Untitled post'}</h2>
        <p className={`mt-4 line-clamp-3 text-sm leading-7 ${pal.mutedText}`}>{getEditableExcerpt(post, 180) || 'Open the post to view the complete summary and linked content.'}</p>
        <div className="mt-4">
          <MetaRow post={post} />
        </div>
      </div>
    </Link>
  )
}

export function EditorialPostCard({ post, href, label = 'Editorial pick' }: CardProps) {
  return (
    <Link href={href} className={`group block min-w-0 rounded-[1.75rem] border ${pal.border} bg-white/4 p-6 ${dc.motion.lift}`}>
      <p className={`${dc.type.eyebrow} ${pal.accentText}`}>{label}</p>
      <h3 className="mt-4 text-3xl font-semibold leading-[1.02] tracking-[-0.05em] text-[var(--slot4-cream)]">{post.title || 'Untitled post'}</h3>
      <div className="mt-4">
        <MetaRow post={post} />
      </div>
      <p className={`mt-5 text-[15px] leading-8 ${pal.mutedText}`}>{getEditableExcerpt(post, 220) || 'A longer text-first card that can stand on typography alone when media is missing.'}</p>
      <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--slot4-cream)]">
        Read more <ArrowRight className="h-4 w-4" />
      </span>
    </Link>
  )
}

export function ImageFirstPostCard({ post, href, label = 'Visual highlight' }: CardProps) {
  const image = getEditablePostImage(post)
  return (
    <Link href={href} className="group block overflow-hidden rounded-[1.75rem] border border-white/10 bg-black/20 transition duration-300 hover:-translate-y-1 motion-reduce:hover:translate-y-0">
      <div className="relative aspect-[4/5] overflow-hidden">
        <img src={image} alt={post.title || 'Visual post'} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.08),rgba(3,10,9,0.88))]" />
        <div className="absolute inset-x-0 bottom-0 p-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/76">{label}</p>
          <h3 className="mt-2 line-clamp-2 text-2xl font-semibold leading-tight tracking-[-0.04em] text-white">{post.title || 'Untitled post'}</h3>
          <p className="mt-3 line-clamp-2 text-sm leading-6 text-white/72">{getEditableExcerpt(post, 100) || 'Open the gallery to view the full visual set.'}</p>
        </div>
      </div>
    </Link>
  )
}

export function EditorialFeatureCard(props: CardProps) {
  return <FeaturedPostCard {...props} />
}

export function RailPostCard(props: CardProps) {
  return <ImageFirstPostCard {...props} />
}

export function CompactIndexCard(props: CardProps) {
  return <CompactPostCard {...props} />
}

export function ArticleListCard(props: CardProps) {
  return <HorizontalPostCard {...props} />
}

export function ImageCardBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--slot4-accent-soft)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--slot4-cream)]">
      <ImageIcon className="h-3.5 w-3.5" /> {label}
    </span>
  )
}
