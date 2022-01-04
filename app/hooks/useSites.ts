import useSWR from 'swr'
import { Site } from '@types'
import { getSitesFetcher } from '@lib/api'
import { useAuth } from './useAuth'

export function useSites() {
  const { authToken } = useAuth()
  const { data, error, mutate } = useSWR<[Site]>([`sites`, authToken], getSitesFetcher)

  return {
    sites: data,
    isLoading: !error && !data,
    error,
    mutate,
  }
}
