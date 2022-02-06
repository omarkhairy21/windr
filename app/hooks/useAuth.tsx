import { useSession } from 'next-auth/react'
import Router from 'next/router'
import { LoadingSpinner } from '@components/LoadingSpinner'

export function useAuth(isProtectedRoute = true): any {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      isProtectedRoute && Router.push('/auth')
    },
  })

  if (status === 'loading') return <LoadingSpinner />
  return { authToken: session?.jwt, userId: session?.id, userEmail: session?.user?.email }
}
