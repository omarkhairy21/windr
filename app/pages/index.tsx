import Head from 'next/head'
import { LandingPageHeader } from '@components/Headers/LandingPageHeader'

export default function Home() {
  return (
    <>
      <Head>
        <title>Windr - Alpha Version </title>
        <link rel="icon" href="/logo.svg" />
      </Head>
      <LandingPageHeader />
    </>
  )
}
