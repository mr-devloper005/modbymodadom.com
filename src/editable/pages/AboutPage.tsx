import { SITE_CONFIG } from '@/lib/site-config'
import { pagesContent } from '@/editable/content/pages.content'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'

export default function AboutPage() {
  return (
    <EditableSiteShell>
      <main className="px-4 py-14 sm:px-6 lg:px-8">
        <section className="mx-auto grid max-w-[var(--editable-container)] gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <article className="rounded-[2rem] border border-[var(--editable-border)] bg-white/4 p-8 shadow-[0_18px_45px_rgba(0,0,0,0.16)] lg:p-12">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[var(--slot4-accent)]">{pagesContent.about.badge}</p>
            <h1 className="editable-display mt-5 text-5xl font-semibold tracking-[-0.05em] text-[var(--slot4-cream)]">About {SITE_CONFIG.name}</h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--slot4-muted-text)]">{pagesContent.about.description}</p>
            <div className="mt-8 space-y-4 text-sm leading-8 text-[var(--slot4-muted-text)]">
              {pagesContent.about.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </article>
          <aside className="space-y-4">
            {pagesContent.about.values.map((value) => (
              <div key={value.title} className="rounded-[2rem] border border-[var(--editable-border)] bg-[var(--slot4-panel-bg)] p-6">
                <h2 className="editable-display text-xl font-semibold text-[var(--slot4-cream)]">{value.title}</h2>
                <p className="mt-3 text-sm leading-7 text-[var(--slot4-muted-text)]">{value.description}</p>
              </div>
            ))}
          </aside>
        </section>
      </main>
    </EditableSiteShell>
  )
}
