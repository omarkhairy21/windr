import useSWR from 'swr'
import { Profile } from '@types'
import { getSitesFetcher } from '@lib/api'
import { useAuth } from './useAuth'

export function useSites() {
  const { authToken, userId } = useAuth()
  const { data, error, mutate } = useSWR<Profile>([`users/${userId}`, authToken], getSitesFetcher)

  return {
    sites: data?.sites,
    isLoading: !error && !data,
    error,
    mutate,
  }
}
