import Link from 'next/link'
import { ArrowRight, Building2, Camera, FileText, Image as ImageIcon, Search, UserRound } from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { HomeTimeSection } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'
import { SITE_CONFIG } from '@/lib/site-config'
import { pagesContent } from '@/editable/content/pages.content'
import {
  CompactPostCard,
  EditorialPostCard,
  FeaturedPostCard,
  HorizontalPostCard,
  ImageFirstPostCard,
  getEditablePostImage,
  postHref,
} from '@/editable/cards/PostCards'

type HomeSectionProps = {
  primaryTask: TaskKey
  primaryRoute: string
  posts: SitePost[]
  timeSections: HomeTimeSection[]
}

const taskIcon: Record<TaskKey, typeof FileText> = {
  article: FileText,
  listing: Building2,
  classified: Building2,
  image: ImageIcon,
  sbm: FileText,
  pdf: FileText,
  profile: UserRound,
}

const container = 'mx-auto w-full max-w-[var(--editable-container)] px-4 sm:px-6 lg:px-8'

function dedupePosts(posts: SitePost[]) {
  const seen = new Set<string>()
  const out: SitePost[] = []
  for (const post of posts) {
    const key = post.slug || post.id || post.title
    if (!key || seen.has(key)) continue
    seen.add(key)
    out.push(post)
  }
  return out
}

function latestPostImages(posts: SitePost[], max = 8) {
  const seen = new Set<string>()
  const out: string[] = []
  for (const post of posts) {
    const img = getEditablePostImage(post)
    if (!img || seen.has(img)) continue
    seen.add(img)
    out.push(img)
    if (out.length >= max) break
  }
  return out
}

export function EditableHomeHero({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const pool = dedupePosts([...posts, ...timeSections.flatMap((section) => section.posts)])
  const heroImages = latestPostImages(pool)
  const spotlight = pool[0]
  const sideOne = pool[1]
  const sideTwo = pool[2]

  return (
    <section className="relative overflow-hidden border-b border-[var(--editable-border)]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(64,138,113,0.22),transparent_36%),radial-gradient(circle_at_top_right,rgba(176,228,204,0.1),transparent_26%)]" />
      <div className={`${container} relative py-10 sm:py-14 lg:py-18`}>
        <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr]">
          <div className="min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[var(--slot4-accent)]">{pagesContent.home.hero.badge}</p>
            <h1 className="editable-display mt-4 max-w-4xl text-balance text-5xl font-semibold leading-[0.96] tracking-[-0.06em] text-[var(--slot4-cream)] sm:text-6xl lg:text-[5.5rem]">
              {pagesContent.home.hero.title.join(' ')}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--slot4-muted-text)] sm:text-lg">{pagesContent.home.hero.description}</p>

            <form action="/search" className="mt-8 flex w-full max-w-2xl flex-col gap-3 rounded-[1.75rem] border border-white/10 bg-white/5 p-3 shadow-[0_24px_60px_rgba(0,0,0,0.2)] sm:flex-row sm:items-center">
              <div className="flex flex-1 items-center gap-3 rounded-[1.2rem] bg-black/10 px-4 py-3">
                <Search className="h-5 w-5 shrink-0 text-[var(--slot4-accent)]" />
                <input
                  name="q"
                  placeholder={pagesContent.home.hero.searchPlaceholder}
                  className="w-full bg-transparent text-sm outline-none"
                />
              </div>
              <button className="shrink-0 rounded-[1.1rem] bg-[var(--editable-cta-bg)] px-6 py-3 text-sm font-semibold text-[var(--editable-cta-text)] transition hover:brightness-95">
                Search
              </button>
            </form>

          </div>

          <div className="grid gap-5 lg:grid-rows-[minmax(0,1fr)_auto]">
            {spotlight ? <FeaturedPostCard post={spotlight} href={postHref(primaryTask, spotlight, primaryRoute)} label={pagesContent.home.hero.featureCardBadge} /> : null}
            <div className="grid gap-5 sm:grid-cols-2">
              {sideOne ? <ImageFirstPostCard post={sideOne} href={postHref(primaryTask, sideOne, primaryRoute)} label="Gallery pick" /> : null}
              {sideTwo ? <EditorialPostCard post={sideTwo} href={postHref(primaryTask, sideTwo, primaryRoute)} label="Profile note" /> : null}
            </div>
          </div>
        </div>

        {heroImages.length ? (
          <div className="mt-8 grid grid-cols-4 gap-3 sm:grid-cols-8">
            {heroImages.slice(0, 8).map((image, index) => (
              <div key={`${image}-${index}`} className="overflow-hidden rounded-2xl border border-white/10 bg-[var(--slot4-media-bg)]">
                <img src={image} alt="Recent post preview" className="aspect-[4/3] h-full w-full object-cover" />
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  )
}

export function EditableStoryRail({ primaryRoute }: HomeSectionProps) {
  const categories = SITE_CONFIG.tasks.filter((task) => task.enabled)
  if (!categories.length) return null
  return (
    <section className="bg-[var(--slot4-warm)]">
      <div className={`${container} py-12 sm:py-14`}>
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--slot4-accent)]">Browse by format</p>
            <h2 className="editable-display mt-2 text-3xl font-semibold tracking-[-0.04em] text-[var(--slot4-cream)] sm:text-4xl">Start from the content type that fits your intent.</h2>
          </div>
          <Link href={primaryRoute} className="hidden items-center gap-1 text-sm font-semibold text-[var(--slot4-page-text)] sm:inline-flex">
            Open archive <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {categories.map((task) => {
            const Icon = taskIcon[task.key] || FileText
            return (
              <Link
                key={task.key}
                href={task.route}
                className="group rounded-[1.5rem] border border-white/10 bg-white/4 px-4 py-6 text-left transition duration-300 hover:-translate-y-1 hover:border-[var(--slot4-accent)] motion-reduce:hover:translate-y-0"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--slot4-accent-soft)] text-[var(--slot4-accent)]">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="mt-4 block text-base font-semibold text-[var(--slot4-cream)]">{task.label}</span>
                <span className="mt-1 block text-sm text-[var(--slot4-muted-text)]">{task.description}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export function EditableMagazineSplit({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const activity = dedupePosts([...posts, ...timeSections.flatMap((section) => section.posts)]).slice(0, 8)
  if (!activity.length) return null

  return (
    <section className="bg-[var(--slot4-page-bg)]">
      <div className={`${container} py-14 sm:py-16`}>
        <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr]">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--slot4-accent)]">Current highlights</p>
            <h2 className="editable-display mt-3 text-3xl font-semibold tracking-[-0.04em] text-[var(--slot4-cream)] sm:text-4xl">A mixed feed of visual posts and identity-led entries.</h2>
            <div className="mt-8 grid gap-5">
              {activity.slice(0, 3).map((post, index) => (
                <HorizontalPostCard key={post.id || post.slug} post={post} href={postHref(primaryTask, post, primaryRoute)} index={index} />
              ))}
            </div>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
            {activity.slice(3, 5).map((post, index) => (
              <EditorialPostCard key={post.id || post.slug} post={post} href={postHref(primaryTask, post, primaryRoute)} label={index === 0 ? 'Text-led feature' : 'Context card'} />
            ))}
            {activity[5] ? <ImageFirstPostCard post={activity[5]} href={postHref(primaryTask, activity[5], primaryRoute)} label="Visual spotlight" /> : null}
          </div>
        </div>
      </div>
    </section>
  )
}

const sectionCopy: Record<string, { eyebrow: string; title: string }> = {
  spotlight: { eyebrow: 'Fresh this week', title: 'New work, recently added' },
  browse: { eyebrow: 'Browse more', title: 'More from the current archive' },
  index: { eyebrow: 'Keep exploring', title: 'Older entries still worth opening' },
}

export function EditableTimeCollections({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const sections =
    timeSections.length > 0
      ? timeSections
      : ([
          { key: 'spotlight', posts: posts.slice(0, 8), href: primaryRoute },
          { key: 'browse', posts: posts.slice(8, 16), href: primaryRoute },
          { key: 'index', posts: posts.slice(16, 24), href: primaryRoute },
        ] as Pick<HomeTimeSection, 'key' | 'posts' | 'href'>[])

  const visible = sections.filter((section) => section.posts.length)
  if (!visible.length) return null

  return (
    <>
      {visible.map((section, index) => {
        const copy = sectionCopy[section.key] || { eyebrow: 'Discover', title: 'More to explore' }
        return (
          <section key={section.key} className={index % 2 === 0 ? 'bg-[var(--slot4-warm)]' : 'bg-[var(--slot4-page-bg)]'}>
            <div className={`${container} py-12 sm:py-14`}>
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--slot4-accent)]">{copy.eyebrow}</p>
                  <h2 className="editable-display mt-2 text-3xl font-semibold tracking-[-0.04em] text-[var(--slot4-cream)] sm:text-4xl">{copy.title}</h2>
                </div>
                <Link href={section.href || primaryRoute} className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-[var(--slot4-page-text)]">
                  See all <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="mt-7 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                {section.posts.slice(0, 8).map((post, postIndex) => (
                  <CompactPostCard key={post.id || post.slug} post={post} href={postHref(primaryTask, post, primaryRoute)} index={postIndex} />
                ))}
              </div>
            </div>
          </section>
        )
      })}
    </>
  )
}

export function EditableHomeCta() {
  return (
    <section id="get-app" className="border-t border-[var(--editable-border)] bg-[var(--slot4-dark-bg)]">
      <div className={`${container} flex flex-col items-center gap-6 py-16 text-center sm:py-20`}>
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--slot4-accent)]">
          <Camera className="h-3.5 w-3.5" /> {pagesContent.home.cta.badge}
        </span>
        <h2 className="editable-display max-w-3xl text-3xl font-semibold tracking-[-0.04em] text-[var(--slot4-cream)] sm:text-5xl">
          {pagesContent.home.cta.title}
        </h2>
        <p className="max-w-2xl text-base leading-8 text-[var(--slot4-muted-text)] sm:text-lg">
          {pagesContent.home.cta.description}
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href={pagesContent.home.cta.primaryCta.href} className="inline-flex items-center gap-2 rounded-full bg-[var(--editable-cta-bg)] px-7 py-3 text-sm font-semibold text-[var(--editable-cta-text)] transition hover:brightness-95">
            {pagesContent.home.cta.primaryCta.label}
          </Link>
          <Link href={pagesContent.home.cta.secondaryCta.href} className="inline-flex items-center gap-2 rounded-full border border-white/10 px-7 py-3 text-sm font-semibold text-[var(--slot4-page-text)] transition hover:bg-white/5">
            {pagesContent.home.cta.secondaryCta.label}
          </Link>
        </div>
      </div>
    </section>
  )
}
