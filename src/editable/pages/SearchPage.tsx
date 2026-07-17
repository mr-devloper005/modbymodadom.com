import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Search } from 'lucide-react'
import { buildPageMetadata } from '@/lib/seo'
import { fetchSiteFeed } from '@/lib/site-connector'
import { getPostTaskKey } from '@/lib/task-data'
import { getMockPostsForTask } from '@/lib/mock-posts'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import type { SitePost } from '@/lib/site-connector'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { HorizontalPostCard, ImageFirstPostCard, getEditablePostImage } from '@/editable/cards/PostCards'
import { pagesContent } from '@/editable/content/pages.content'

export const revalidate = 3

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: '/search',
    title: pagesContent.search.metadata.title,
    description: pagesContent.search.metadata.description,
  })
}

const compactText = (value: unknown) => (typeof value === 'string' ? value.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim().toLowerCase() : '')
const getContent = (post: SitePost) => (post.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {})
const allowedSearchTasks: TaskKey[] = ['image', 'profile']

const matches = (post: SitePost, query: string, category: string, task: string) => {
  const content = getContent(post)
  const typeText = compactText(content.type)
  if (typeText === 'comment') return false
  const derivedTask = (getPostTaskKey(post) || typeText) as TaskKey | string
  if (!allowedSearchTasks.includes(derivedTask as TaskKey)) return false
  if (task && derivedTask !== task) return false
  const categoryText = compactText(content.category)
  const tagsText = compactText(Array.isArray(post.tags) ? post.tags.join(' ') : '')
  if (category && !(categoryText || tagsText).includes(category)) return false
  if (!query) return true
  return [post.title, post.summary, content.description, content.body, content.excerpt, content.category, Array.isArray(post.tags) ? post.tags.join(' ') : '']
    .some((value) => compactText(value).includes(query))
}

function SearchVisualCard({ post }: { post: SitePost }) {
  const task = getPostTaskKey(post) as TaskKey | null
  const taskRoute = SITE_CONFIG.tasks.find((item) => item.key === task)?.route
  const href = `${taskRoute || `/${task || 'article'}`}/${post.slug}`
  return <ImageFirstPostCard post={post} href={href} label={SITE_CONFIG.tasks.find((item) => item.key === task)?.label || 'Post'} />
}

function SearchListCard({ post, index }: { post: SitePost; index: number }) {
  const task = getPostTaskKey(post) as TaskKey | null
  const taskRoute = SITE_CONFIG.tasks.find((item) => item.key === task)?.route
  const href = `${taskRoute || `/${task || 'article'}`}/${post.slug}`
  return <HorizontalPostCard post={post} href={href} index={index} />
}

export default async function SearchPage({ searchParams }: { searchParams?: Promise<{ q?: string; category?: string; task?: string; master?: string }> }) {
  const resolved = (await searchParams) || {}
  const query = (resolved.q || '').trim()
  const normalized = query.toLowerCase()
  const category = (resolved.category || '').trim().toLowerCase()
  const requestedTask = (resolved.task || '').trim().toLowerCase()
  const task = allowedSearchTasks.includes(requestedTask as TaskKey) ? requestedTask : ''
  const useMaster = resolved.master !== '0'
  const feed = await fetchSiteFeed(useMaster ? 1000 : 300, useMaster ? { fresh: true, category: category || undefined, task: task || undefined } : undefined)
  const posts = feed?.posts?.length
    ? feed.posts
    : useMaster
      ? []
      : SITE_CONFIG.tasks.filter((item) => allowedSearchTasks.includes(item.key as TaskKey)).flatMap((item) => getMockPostsForTask(item.key))
  const results = posts.filter((post) => matches(post, normalized, category, task)).slice(0, normalized ? 80 : 36)
  const enabledTasks = SITE_CONFIG.tasks.filter((item) => allowedSearchTasks.includes(item.key as TaskKey))
  const heroVisual = results[0]

  return (
    <EditableSiteShell>
      <main className="min-h-screen">
        <section className="mx-auto max-w-[var(--editable-container)] px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
          <div className="grid gap-8 rounded-[2rem] border border-[var(--editable-border)] bg-[var(--slot4-panel-bg)] p-6 shadow-[0_20px_48px_rgba(0,0,0,0.22)] lg:grid-cols-[0.86fr_1.14fr] lg:p-10">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--slot4-accent)]">{pagesContent.search.hero.badge}</p>
              <h1 className="editable-display mt-5 text-5xl font-semibold leading-[0.94] tracking-[-0.06em] text-[var(--slot4-cream)] sm:text-6xl">{pagesContent.search.hero.title}</h1>
              <p className="mt-6 max-w-xl text-base leading-8 text-[var(--slot4-muted-text)]">{pagesContent.search.hero.description}</p>
              {heroVisual ? (
                <div className="mt-8 overflow-hidden rounded-[1.75rem] border border-white/10">
                  <img src={getEditablePostImage(heroVisual)} alt={heroVisual.title || 'Search highlight'} className="aspect-[16/9] w-full object-cover" />
                </div>
              ) : null}
            </div>
            <form action="/search" className="self-end rounded-[1.75rem] border border-[var(--editable-border)] bg-[var(--slot4-panel-bg)] p-5">
              <input type="hidden" name="master" value="1" />
              <label className="flex items-center gap-3 rounded-full border border-white/10 bg-[var(--slot4-surface-bg)] px-4 py-3">
                <Search className="h-5 w-5 text-[var(--slot4-accent)]" />
                <input name="q" defaultValue={query} placeholder={pagesContent.search.hero.placeholder} className="min-w-0 flex-1 bg-transparent text-base outline-none" />
              </label>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <input name="category" defaultValue={category} placeholder="Category" className="h-12 rounded-full border border-white/10 bg-[var(--slot4-surface-bg)] px-4 text-sm outline-none" />
                <select name="task" defaultValue={task} className="h-12 rounded-full border border-white/10 bg-[var(--slot4-surface-bg)] px-4 text-sm outline-none">
                  <option value="">All content types</option>
                  {enabledTasks.map((item) => <option key={item.key} value={item.key}>{item.label}</option>)}
                </select>
              </div>
              <button className="mt-3 inline-flex h-12 w-full items-center justify-center rounded-full bg-[var(--editable-cta-bg)] px-6 text-sm font-semibold text-[var(--editable-cta-text)] transition hover:brightness-95" type="submit">Search</button>
            </form>
          </div>

          <div className="mt-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--slot4-muted-text)]">{results.length} results</p>
              <h2 className="editable-display mt-2 text-3xl font-semibold tracking-[-0.05em] text-[var(--slot4-cream)]">{query ? `Results for "${query}"` : pagesContent.search.resultsTitle}</h2>
            </div>
            <Link href="/profile" className="inline-flex items-center gap-2 rounded-full border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] px-5 py-3 text-sm font-semibold text-[var(--slot4-page-text)]">Browse profiles <ArrowRight className="h-4 w-4" /></Link>
          </div>

          {results.length ? (
            <>
              <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                {results.slice(0, 4).map((post) => <SearchVisualCard key={post.id || post.slug} post={post} />)}
              </div>
              <div className="mt-6 grid gap-5">
                {results.slice(4).map((post, index) => <SearchListCard key={post.id || post.slug} post={post} index={index} />)}
              </div>
            </>
          ) : (
            <div className="mt-8 rounded-[2rem] border border-dashed border-[var(--editable-border)] bg-[var(--slot4-panel-bg)] p-10 text-center">
              <p className="editable-display text-2xl font-semibold tracking-[-0.04em] text-[var(--slot4-cream)]">No matching posts found.</p>
              <p className="mt-3 text-sm text-[var(--slot4-muted-text)]">Try a different keyword, task type, or category.</p>
            </div>
          )}
        </section>
      </main>
    </EditableSiteShell>
  )
}
