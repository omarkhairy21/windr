import useSWR from 'swr'
import { Site } from '@types'
import { getSiteFetcher } from '@lib/api'
import { useAuth } from './useAuth'

export function useSite(id: any) {
  const { authToken } = useAuth()
  const { data, error, mutate } = useSWR<Site, Error>([`sites/${id}`, authToken], getSiteFetcher)

  return {
    site: data,
    isLoading: !error && !data,
    error,
    mutate,
  }
}
