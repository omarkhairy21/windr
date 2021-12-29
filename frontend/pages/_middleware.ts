import { NextRequest, NextResponse } from 'next/server'

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Ex: windr.co or khairy.me
  const hostname = req.headers.get('host')

  /**
    ROOT_URL=windr.co
    CURR_HOST=www
   */
  const customDomainOrSubDomain = hostname?.replace(`.${process.env.ROOT_URL}`, '')

  /* 
    If localhost, assign the host value manually
    If prod, get the custom domain/subdomain value by removing the root URL
    (in the case of "test.vercel.app", "vercel.app" is the root URL)
  */
  const currentCustomDomainOrSubDomain =
    process.env.NODE_ENV === 'production' ? customDomainOrSubDomain : process.env.CURR_HOST

  /* 
  Prevent security issues – users should not be able to canonically access
  the pages/sites folder and its respective contents. This can also be done
  via rewrites to a custom 404 page
  */
  if (pathname.startsWith(`/_sites`)) {
    return new Response(null, { status: 404 })
  }

  if (
    currentCustomDomainOrSubDomain !== process.env.CURR_HOST &&
    currentCustomDomainOrSubDomain !== process.env.ROOT_URL &&
    !pathname.includes('.') && // exclude all files in the public folder
    !pathname.startsWith('/api') // exclude all API routes
  ) {
    // console.log('It Will Redirect to', `/_sites/${currentCustomDomainOrSubDomain}`)
    //console.log('HostName ', req.headers.get('host'))
    /**
      rewrite to the current hostname under the pages/sites folder
      the main logic component will happen in pages/sites/[site]/index.tsx
     */
    return NextResponse.rewrite(`/_sites/${currentCustomDomainOrSubDomain}`)
  }
}
