import { API_URL } from '@constants'
import { Site as ISite } from '@types'
import Head from 'next/head'
import { getHTML } from '@components/Editor/EditorExtensions'
import styles from '@styles/site.module.css'

export default function Site(site: ISite) {
  return (
    <Head>
      <title>{site.name}</title>
      <div className={styles.wrapper}>
        <div dangerouslySetInnerHTML={{ __html: site.contentHTML }} />
      </div>
    </Head>
  )
}

let token: string
const getAdminToken = async () => {
  if (token) return token
  const response = await fetch(`${API_URL}/auth/local`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      identifier: process.env.STRAPI_AGENT_EMAIL,
      password: process.env.STRAPI_AGENT_PASSWORD,
    }),
  })

  const { jwt: adminToken } = await response.json()
  token = adminToken
  return adminToken
}

export async function getStaticPaths() {
  const adminToken = await getAdminToken()

  const sitesRes = await fetch(`${API_URL}/sites`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${adminToken}`,
    },
  })

  const sites = await sitesRes.json()

  console.log('Sites response', sites)

  const publishedSites = sites.filter((site: ISite) => site.isDrafted === false)
  const domainSitesPaths = publishedSites
    .filter(({ subDomain }: ISite) => subDomain === null)
    .map((site: ISite) => ({
      params: { site: site.customDomain },
    }))

  const subDomainSites = publishedSites
    .filter(({ customDomain }: ISite) => customDomain === null)
    .map((site: ISite) => ({ params: { site: site.subDomain } }))

  console.log('👍👍👍👍', [...domainSitesPaths, ...subDomainSites])

  return {
    paths: [...domainSitesPaths, ...subDomainSites],
    fallback: true,
  }
}

type Params = {
  params: {
    site: string
  }
}

export async function getStaticProps({ params: { site } }: Params) {
  // check if site is a custom domain or a subdomain
  const isCustomDomain = site.includes('.') ? true : false
  const adminToken = await getAdminToken()

  const query = isCustomDomain ? `customDomain=${site}` : `subDomain=${site}`
  const response = await fetch(`${API_URL}/sites/?${query}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${adminToken}`,
    },
  })

  const [siteData]: ISite[] = await response.json()
  siteData.contentHTML = getHTML(siteData.content)

  console.log(`HTML Content🧶`, siteData.contentHTML)
  console.log(`ResponseSiteData 🥑${site}🥑 ${response.status}`, response)
  console.log(`🍉SiteData🍉: ${site}`, siteData)

  if (!siteData) return { notFound: true }

  return {
    props: siteData,
    revalidate: 10,
  }
}
