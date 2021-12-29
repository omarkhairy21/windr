import { API_URL } from '@constants'

export const getSitesFetcher = async (endPoint: string, token: string) => {
  const response = await fetch(`${API_URL}/${endPoint}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    const error = new Error('An error occurred while fetching the data.')
    return error
  }
  return response.json()
}

export const getSiteFetcher = async (endPoint: string, token: string) => {
  const response = await fetch(`${API_URL}/${endPoint}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    const error = new Error('An error occurred while fetching the data.')
    return error
  }
  return response.json()
}

export const deleteSiteFetcher = async (endPoint: string, token: string) => {
  const response = await fetch(`${API_URL}/${endPoint}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    const error = new Error('An error occurred while fetching the data.')
    return error
  }
  return response.json()
}

interface ICreateSiteFetcher<T> {
  site: T
  token: string
  owner: string
}

export const createSite = <T>({ site, token, owner }: ICreateSiteFetcher<T>) => {
  return fetch(`${API_URL}/sites`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ ...site, owner }),
  })
}
