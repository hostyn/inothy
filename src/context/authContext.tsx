import { createContext, useContext, useEffect, useState } from 'react'
import { auth, logEvent } from '../config/firebase'
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  type UserCredential,
} from 'firebase/auth'
import { getUserData } from '../util/api'
import { useRouter } from 'next/router'
import LoadingPage from '../components/LoadingPage'
import { type IncomingHttpHeaders } from 'http2'
import type { User } from 'types/user'

interface IAuthContext {
  login: (email: string, password: string) => Promise<UserCredential> | null
  register: (email: string, password: string) => Promise<UserCredential> | null
  logout: () => Promise<void>
  updateData: () => Promise<void>
  user: User | null
  isUser: boolean
  headers: IncomingHttpHeaders | null
  isLoading: boolean
}

interface AuthProviderProps {
  children?: JSX.Element
  headers: IncomingHttpHeaders
}

const authContext = createContext<IAuthContext>({
  user: null,
  isUser: false,
  isLoading: true,
  headers: null,
  login: (email: string, password: string) => null,
  register: (email: string, password: string) => null,
  logout: async () => {},
  updateData: async () => {},
})

export const useAuth = (): IAuthContext => useContext(authContext)

export function AuthProvider({
  children,
  headers,
}: AuthProviderProps): JSX.Element {
  const {
    push,
    pathname,
    query: { ref },
  } = useRouter()

  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isUser, setIsUser] = useState(false)

  // AUTH FUNCTIONS
  const login = async (
    email: string,
    password: string
  ): Promise<UserCredential> => {
    const user = await signInWithEmailAndPassword(auth, email, password)
    try {
      logEvent('login')
    } catch {}
    return user
  }

  const register = async (
    email: string,
    password: string
  ): Promise<UserCredential> => {
    const user = await createUserWithEmailAndPassword(auth, email, password)
    try {
      logEvent('sign_up')
    } catch {}
    return user
  }

  const logout = async (): Promise<void> => {
    setIsUser(false)
    await signOut(auth)
    setUser(null)
    try {
      logEvent('logout')
    } catch {}
  }

  const updateData = async (): Promise<void> => {
    if (user == null) return
    if (user.emailVerified) {
      const data = await getUserData(user)
      setUser({ ...user, data })
      if (data.profileCompleted ?? false) setIsUser(true)
      else setIsUser(false)
    }
  }

  useEffect(() => {
    const unsubscirbe = onAuthStateChanged(auth, currentUser => {
      if (currentUser !== null) {
        if (currentUser.emailVerified) {
          getUserData(currentUser)
            .then(data => {
              setUser({ ...currentUser, data })
              if (data.profileCompleted ?? false) setIsUser(true)
              else setIsUser(false)
              setIsLoading(false)
            })
            .catch(() => {})
        } else {
          setUser(currentUser)
          setIsUser(false)
          setIsLoading(false)
        }
      } else {
        setIsLoading(false)
      }
    })
    return () => {
      unsubscirbe()
    }
  }, [ref])

  useEffect(() => {
    if (typeof ref !== 'string') return
    const localRef = localStorage.getItem('ref')
    if (localRef == null && ref !== null) {
      localStorage.setItem('ref', ref)
    }
  }, [ref])

  if (
    !isLoading &&
    user != null &&
    user.data != null &&
    !(user.data.profileCompleted ?? false) &&
    pathname !== '/completeprofile' &&
    pathname !== '/useractions'
  ) {
    push('/completeprofile')
      .then(() => {})
      .catch(() => {})
    return <LoadingPage />
  }

  return (
    <authContext.Provider
      value={{
        user,
        isUser,
        isLoading,
        headers,
        login,
        register,
        logout,
        updateData,
      }}
    >
      {children}
    </authContext.Provider>
  )
}
