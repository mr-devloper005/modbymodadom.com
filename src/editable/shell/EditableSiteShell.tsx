import type { ReactNode } from 'react'
import { EditableNavbar } from '@/editable/shell/EditableNavbar'
import { EditableFooter } from '@/editable/shell/EditableFooter'
import { EditablePageMotion } from '@/editable/shell/EditablePageMotion'
import { editableDesignContract as dc } from '@/editable/layouts/design-contract'

export function EditableSiteShell({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`editable-site-root ${dc.shell.page} relative flex min-h-screen flex-col overflow-x-clip ${className}`}>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[38rem] bg-[radial-gradient(circle_at_top,rgba(64,138,113,0.22),transparent_55%)]" />
      <EditableNavbar />
      <EditablePageMotion>{children}</EditablePageMotion>
      <EditableFooter />
    </div>
  )
}
