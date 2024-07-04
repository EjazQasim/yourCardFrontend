// ** React Imports
import { ReactNode, ReactElement, useEffect } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Hooks Import
import { useAuth } from 'src/hooks/useAuth'

interface AuthGuardProps {
  children: ReactNode
  fallback: ReactElement | null
}

const AuthGuard = (props: AuthGuardProps) => {
  const { children, fallback } = props
  const auth: any = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!router.isReady) {
      return
    }
    if (auth.user === null) {
      if (router.asPath !== '/') {
        router.replace({
          pathname: '/auth/login',
          query: { returnUrl: router.asPath }
        })
      } else {
        router.replace('/auth/login')
      }
    }
  }, [router, auth])

  if (!auth.user) {
    return fallback
  }

  return <>{children}</>
}

export default AuthGuard
