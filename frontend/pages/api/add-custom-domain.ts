import type { NextApiRequest, NextApiResponse } from 'next'

export default async function addDomain(req: NextApiRequest, res: NextApiResponse) {
  const { domain } = req.query
  const ADD_DOMAIN_URL = `https://api.vercel.com/v8/projects/${process.env.VERCEL_PROJECT_ID}/domains`

  const response = await fetch(ADD_DOMAIN_URL, {
    body: `{\n  "name": "${domain}"\n}`,
    headers: {
      Authorization: `Bearer ${process.env.AUTH_BEARER_TOKEN}`,
      'Content-Type': 'application/json',
    },
    method: 'POST',
  })

  const data = await response.json()
  if (data.error?.code == 'forbidden') {
    res.status(403).end()
  } else if (data.error?.code == 'domain_taken') {
    res.status(409).end()
  } else {
    res.status(200).end()
  }
}
