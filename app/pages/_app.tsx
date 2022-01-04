import { useCallback, useEffect, useState } from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { SessionProvider as AuthProvider } from 'next-auth/react'
import Router from 'next/router'
import type { AppProps } from 'next/app'

import '@styles/globals.css'
import { LoadingSpinner } from '@components/LoadingSpinner'

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const [isRouteLoading, setIsRouteLoading] = useState(false)

  const onRouteChangeStart = useCallback(() => setIsRouteLoading(true), [])
  const onRouteChangeDone = useCallback(() => setIsRouteLoading(false), [])

  useEffect(() => {
    Router.events.on('routeChangeStart', onRouteChangeStart)
    Router.events.on('routeChangeComplete', onRouteChangeDone)
    Router.events.on('routeChangeError', onRouteChangeDone)

    return () => {
      Router.events.off('routeChangeStart', onRouteChangeStart)
      Router.events.off('routeChangeComplete', onRouteChangeDone)
      Router.events.off('routeChangeError', onRouteChangeDone)
    }
  }, [onRouteChangeStart, onRouteChangeDone])

  return (
    <AuthProvider session={session} refetchInterval={0}>
      <ChakraProvider>
        {isRouteLoading ? <LoadingSpinner /> : <Component {...pageProps} />}
      </ChakraProvider>
    </AuthProvider>
  )
}

export default MyApp
