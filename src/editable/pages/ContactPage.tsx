'use client'

import { Building2, FileText, Image as ImageIcon, Mail, Sparkles, UserRound } from 'lucide-react'
import { pagesContent } from '@/editable/content/pages.content'
import { getFactoryState } from '@/design/factory/get-factory-state'
import { getProductKind } from '@/design/factory/get-product-kind'
import { EditableContactLeadForm } from '@/editable/components/EditableContactLeadForm'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'

function getLanes(kind: ReturnType<typeof getProductKind>) {
  if (kind === 'directory') {
    return [
      { icon: Building2, title: 'Listing updates', body: 'Reach out about business records, contact details, and public-facing listing changes.' },
      { icon: Mail, title: 'Partnerships', body: 'Use this lane for collaborations, paid placement questions, and distribution requests.' },
      { icon: Sparkles, title: 'Coverage planning', body: 'Tell us what kind of place, service, or region you want to surface next.' },
    ]
  }
  if (kind === 'editorial') {
    return [
      { icon: FileText, title: 'Story submissions', body: 'Share article ideas, commentary, or long-form concepts that fit the site.' },
      { icon: Mail, title: 'Editorial support', body: 'Ask about structure, formatting, or publication support for upcoming pieces.' },
      { icon: Sparkles, title: 'Feature requests', body: 'Suggest improvements to the reading and discovery experience.' },
    ]
  }
  if (kind === 'visual') {
    return [
      { icon: ImageIcon, title: 'Gallery submissions', body: 'Use this for image collections, showcase requests, and visual updates.' },
      { icon: UserRound, title: 'Profile changes', body: 'Request profile edits, public details updates, or identity corrections.' },
      { icon: Mail, title: 'Partnership requests', body: 'Start a conversation about placements, collaborations, or featured launches.' },
    ]
  }
  return [
    { icon: Sparkles, title: 'Collection suggestions', body: 'Suggest useful resources, groupings, and better ways to browse what is already live.' },
    { icon: Mail, title: 'General support', body: 'Use this lane for account questions, publishing help, and archive issues.' },
    { icon: FileText, title: 'Reference updates', body: 'Send corrections or additions for public-facing resource pages.' },
  ]
}

export default function ContactPage() {
  const { recipe } = getFactoryState()
  const productKind = getProductKind(recipe)
  const lanes = getLanes(productKind)

  return (
    <EditableSiteShell>
      <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <section className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--slot4-accent)]">{pagesContent.contact.eyebrow}</p>
            <h1 className="editable-display mt-4 text-5xl font-semibold tracking-[-0.05em] text-[var(--slot4-cream)]">{pagesContent.contact.title}</h1>
            <p className="mt-5 max-w-2xl text-sm leading-8 text-[var(--slot4-muted-text)]">{pagesContent.contact.description}</p>
            <div className="mt-8 space-y-4">
              {lanes.map((lane) => (
                <div key={lane.title} className="rounded-[1.75rem] border border-[var(--editable-border)] bg-white/4 p-5">
                  <lane.icon className="h-5 w-5 text-[var(--slot4-accent)]" />
                  <h2 className="editable-display mt-3 text-xl font-semibold text-[var(--slot4-cream)]">{lane.title}</h2>
                  <p className="mt-2 text-sm leading-7 text-[var(--slot4-muted-text)]">{lane.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-[var(--editable-border)] bg-[var(--slot4-panel-bg)] p-7 shadow-[0_18px_45px_rgba(0,0,0,0.16)]">
            <h2 className="editable-display text-2xl font-semibold text-[var(--slot4-cream)]">{pagesContent.contact.formTitle}</h2>
            <EditableContactLeadForm />
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
