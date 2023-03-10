import VerifyEmailBanner from '@components/VerifyEmailBanner'
import { sizes } from '@config/theme'
import { createContext, useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { useAuth } from './authContext'

interface BannerContextProps {
  banner: JSX.Element
  setBanner: (banner: JSX.Element) => void
  clearBanner: () => void
  isBanner: boolean
}

const BannerDiv = styled.div`
  min-width: 100vw;
  max-width: 100vw;
  min-height: ${sizes.banner};
  max-height: ${sizes.banner};
  display: grid;
`

const bannerContext = createContext<BannerContextProps>({
  banner: <></>,
  setBanner: banner => {},
  clearBanner: () => {},
  isBanner: false,
})

export default function useBanner(): BannerContextProps {
  return useContext(bannerContext)
}

export function BannerProvider({
  children,
}: {
  children: JSX.Element | JSX.Element[]
}): JSX.Element {
  const [banner, setBannerElement] = useState(<></>)
  const [isBanner, setIsBanner] = useState(false)

  const { user } = useAuth()

  const setBanner = (banner: JSX.Element): void => {
    setBannerElement(banner)
    setIsBanner(true)
  }

  const clearBanner = (): void => {
    setIsBanner(false)
    setBannerElement(<></>)
  }

  useEffect(() => {
    if (user !== null && !user.emailVerified) {
      setBannerElement(<VerifyEmailBanner />)
      setIsBanner(true)
    } else {
      setIsBanner(false)
      setBannerElement(<></>)
    }
  }, [user])

  return (
    <bannerContext.Provider
      value={{ banner, setBanner, clearBanner, isBanner }}
    >
      {isBanner && <BannerDiv>{banner}</BannerDiv>}
      {children}
    </bannerContext.Provider>
  )
}
