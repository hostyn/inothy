import { trpc } from '@services/trpc'
import { type RouterOutputs } from 'backend'
import { useAuthUser } from 'next-firebase-auth'

interface UseAuth {
  user: ReturnType<typeof useAuthUser>
  userData?: RouterOutputs['auth']['getUserData']
}

export default function useAuth(): UseAuth {
  const user = useAuthUser()
  const { data: userData } = trpc.auth.getUserData.useQuery()

  return { user, userData }
}
