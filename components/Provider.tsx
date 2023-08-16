'use client'

import { SessionProvider } from 'next-auth/react'
import type { Session } from 'next-auth'

type Props = {
  children: React.ReactNode
  session?: Session | null | undefined
}

const Provider = ({children, session}:Props) => {
  console.log('provider session', session)
  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  )
}

export default Provider