'use client'

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { globalContent } from '@/editable/content/global.content'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

export function EditableFooter() {
  const year = new Date().getFullYear()
  const { session, logout } = useEditableLocalAuthSession()

  return (
    <footer className="mt-auto border-t border-[var(--editable-border)] bg-[var(--editable-footer-bg)] text-[var(--editable-footer-text)]">
      <div className="mx-auto grid max-w-[var(--editable-container)] gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.3fr_0.8fr_0.8fr_0.8fr] lg:px-8">
        <div>
          <Link href="/" className="inline-flex items-center gap-3">
            <img src="/favicon.png?v=20260413" alt={SITE_CONFIG.name} className="h-10 w-10 object-contain" />
            <span className="editable-display text-xl font-semibold">{SITE_CONFIG.name}</span>
          </Link>
          <p className="mt-5 max-w-md text-sm leading-7 text-[var(--slot4-muted-text)]">{globalContent.footer.description}</p>
        </div>

        {globalContent.footer.columns.map((column) => (
          <div key={column.title}>
            <h3 className="text-[10px] font-semibold uppercase tracking-[0.26em] text-[var(--slot4-muted-text)]">{column.title}</h3>
            <div className="mt-4 grid gap-3">
              {column.links.map((link) => (
                <Link key={link.href} href={link.href} className="inline-flex items-center gap-2 text-sm font-medium text-[var(--slot4-page-text)]/88 transition hover:text-[var(--slot4-cream)]">
                  {link.label} <ArrowUpRight className="h-3.5 w-3.5 opacity-60" />
                </Link>
              ))}
            </div>
          </div>
        ))}

        <div>
          <h3 className="text-[10px] font-semibold uppercase tracking-[0.26em] text-[var(--slot4-muted-text)]">Account</h3>
          <div className="mt-4 grid gap-3">
            {session ? (
              <>
                <Link href="/create" className="text-sm font-medium text-[var(--slot4-page-text)]/88 transition hover:text-[var(--slot4-cream)]">Create</Link>
                <button type="button" onClick={logout} className="text-left text-sm font-medium text-[var(--slot4-page-text)]/88 transition hover:text-[var(--slot4-cream)]">Logout</button>
              </>
            ) : (
              <>
                <Link href="/login" className="text-sm font-medium text-[var(--slot4-page-text)]/88 transition hover:text-[var(--slot4-cream)]">Login</Link>
                <Link href="/signup" className="text-sm font-medium text-[var(--slot4-page-text)]/88 transition hover:text-[var(--slot4-cream)]">Sign up</Link>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="border-t border-[var(--editable-border)] px-4 py-5 text-center text-xs font-medium tracking-[0.12em] text-[var(--slot4-muted-text)]">
        © {year} {SITE_CONFIG.name}. {globalContent.footer.bottomNote}
      </div>
    </footer>
  )
}
