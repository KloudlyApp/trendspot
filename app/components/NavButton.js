'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NavButton = ({ href, label }) => {
  const pathname = usePathname()
  return (
    <Link href={href}>
      <Button variant={pathname === href ? 'active' : 'default'}>
        {label}
      </Button>
    </Link>
  )
}
export default NavButton
