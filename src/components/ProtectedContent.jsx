import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useAuth } from '../context/authContext'
import LoadingPage from './LoadingPage'

export default function ProtectedContent ({ children }) {
  const { isUser, isLoading } = useAuth()
  const [redirect, setRedirect] = useState(true)
  const { push } = useRouter()

  useEffect(() => {
    if (!isLoading & !isUser) {
      push('/')
      setRedirect(true)
    } else {
      setRedirect(false)
    }
  }, [isUser, push, isLoading])

  if (isLoading) return <LoadingPage />

  return redirect ? <LoadingPage /> : <>{children}</>
}
