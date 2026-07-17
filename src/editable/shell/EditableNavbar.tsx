'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowUpRight, LogIn, Menu, PlusCircle, Search, UserPlus, X } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { globalContent } from '@/editable/content/global.content'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`)
}

export function EditableNavbar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const { session, logout } = useEditableLocalAuthSession()
  const taskItems = useMemo(
    () => SITE_CONFIG.tasks.filter((task) => task.enabled).map((task) => ({ label: task.label, href: task.route })),
    [],
  )
  const navItems = globalContent.nav.primaryLinks?.length ? globalContent.nav.primaryLinks : taskItems

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--editable-border)] bg-[var(--editable-nav-bg)]/92 text-[var(--editable-nav-text)] backdrop-blur-xl">
      <nav className="mx-auto flex min-h-[84px] w-full max-w-[var(--editable-container)] items-center gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex shrink-0 items-center gap-3">
          <img src="/favicon.png?v=20260413" alt={SITE_CONFIG.name} className="h-10 w-10 object-contain" />
          <span className="hidden min-w-0 md:block">
            <span className="editable-display block max-w-[220px] truncate text-xl font-semibold leading-none">{SITE_CONFIG.name}</span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => {
            const active = isActive(pathname, item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] transition ${
                  active
                    ? 'bg-[var(--slot4-accent-soft)] text-[var(--slot4-cream)]'
                    : 'text-[var(--slot4-muted-text)] hover:bg-white/5 hover:text-[var(--slot4-page-text)]'
                }`}
              >
                {item.label}
              </Link>
            )
          })}
        </div>

        <form action="/search" className="mx-auto hidden min-w-0 flex-1 justify-center md:flex">
          <label className="flex w-full max-w-md items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.02)] focus-within:border-[var(--slot4-accent)]">
            <Search className="h-4 w-4 shrink-0 text-[var(--slot4-accent)]" />
            <input
              name="q"
              type="search"
              placeholder="Search profiles and galleries"
              className="min-w-0 flex-1 bg-transparent text-sm font-medium outline-none"
            />
          </label>
        </form>

        <div className="ml-auto flex shrink-0 items-center gap-2">
          {session ? (
            <>
              <Link
                href="/create"
                className="hidden items-center gap-2 rounded-full bg-[var(--editable-cta-bg)] px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--editable-cta-text)] shadow-[0_12px_26px_rgba(176,228,204,0.14)] transition hover:brightness-95 sm:inline-flex"
              >
                <PlusCircle className="h-3.5 w-3.5" /> Create
              </Link>
              <button
                type="button"
                onClick={logout}
                className="hidden rounded-full border border-white/10 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--slot4-muted-text)] transition hover:text-[var(--slot4-page-text)] sm:inline-flex"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="hidden items-center gap-2 rounded-full border border-white/10 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--slot4-muted-text)] transition hover:text-[var(--slot4-page-text)] sm:inline-flex"
              >
                <LogIn className="h-3.5 w-3.5" /> Login
              </Link>
              <Link
                href="/signup"
                className="hidden items-center gap-2 rounded-full bg-[var(--editable-cta-bg)] px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--editable-cta-text)] transition hover:brightness-95 sm:inline-flex"
              >
                <UserPlus className="h-3.5 w-3.5" /> Sign up
              </Link>
            </>
          )}
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="rounded-full border border-white/10 bg-white/5 p-2.5 lg:hidden"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {open ? (
        <div className="border-t border-white/10 bg-[var(--editable-nav-bg)] px-4 py-5 lg:hidden">
          <form action="/search" className="mb-5 flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-3">
            <Search className="h-4 w-4 text-[var(--slot4-accent)]" />
            <input name="q" type="search" placeholder="Search profiles and galleries" className="min-w-0 flex-1 bg-transparent text-sm outline-none" />
          </form>
          <div className="grid gap-2">
            {[{ label: 'Home', href: '/' }, ...navItems, ...(session ? [{ label: 'Create', href: '/create' }] : [{ label: 'Login', href: '/login' }, { label: 'Sign up', href: '/signup' }]), { label: 'Contact', href: '/contact' }].map((item) => {
              const active = isActive(pathname, item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-semibold ${
                    active ? 'bg-[var(--slot4-accent-soft)] text-[var(--slot4-cream)]' : 'bg-white/5 text-[var(--slot4-page-text)]'
                  }`}
                >
                  {item.label}
                  <ArrowUpRight className="h-4 w-4 opacity-60" />
                </Link>
              )
            })}
          </div>
        </div>
      ) : null}
    </header>
  )
}
