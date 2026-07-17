import Link from 'next/link'
import { ArrowRight, SearchX } from 'lucide-react'
import { cn } from '@/lib/utils'

type EmptyStateProps = {
  title?: string
  description?: string
  actionLabel?: string
  actionHref?: string
  className?: string
}

export function EmptyState({
  title = 'Nothing is published here yet',
  description = 'New posts will appear here automatically as soon as this section has live content.',
  actionLabel = 'Back to home',
  actionHref = '/',
  className,
}: EmptyStateProps) {
  return (
    <section className={cn('rounded-[2rem] border border-[var(--editable-border)] bg-white/4 p-8 text-center shadow-[0_18px_40px_rgba(0,0,0,0.14)]', className)}>
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[var(--slot4-accent-soft)] text-[var(--slot4-accent)]">
        <SearchX className="h-6 w-6" />
      </div>
      <h2 className="editable-display mt-5 text-2xl font-semibold tracking-[-0.03em] text-[var(--slot4-cream)]">{title}</h2>
      <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-[var(--slot4-muted-text)]">{description}</p>
      <Link href={actionHref} className="mt-6 inline-flex items-center gap-2 rounded-full border border-[var(--editable-border)] px-5 py-3 text-sm font-semibold text-[var(--slot4-page-text)] transition hover:bg-white/5">
        {actionLabel}
        <ArrowRight className="h-4 w-4" />
      </Link>
    </section>
  )
}

export function TaskEmptyState({ taskLabel = 'posts', className }: { taskLabel?: string; className?: string }) {
  return (
    <EmptyState
      className={className}
      title={`No ${taskLabel} available yet`}
      description={`Published ${taskLabel} will appear here automatically when new content goes live.`}
      actionLabel="Explore the site"
      actionHref="/"
    />
  )
}

export function ContactSuccessState({ className }: { className?: string }) {
  return (
    <EmptyState
      className={className}
      title="Message received"
      description="Thanks for reaching out. Your request has been saved and sent through the contact flow."
      actionLabel="Return home"
      actionHref="/"
    />
  )
}
