import useSWR from 'swr'

export function useMessage(id) {
  return useSWR(`/api/messages/${id}`)
}