import type { NextApiRequest, NextApiResponse } from 'next'

export default async function checkCustomDomain(req: NextApiRequest, res: NextApiResponse) {
  const { subDomain } = req.query
  const response = await fetch(`http://${subDomain}.windr.co/`)

  // subDomain is already taken
  if (response.status === 200) res.status(403).end()
  // subdomain is not taken
  if (response.status === 404) res.status(200).end()

  // something else
  res.status(409).end()
}
