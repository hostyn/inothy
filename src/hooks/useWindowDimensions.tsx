import { useState, useEffect } from 'react'

interface WindowDimensions {
  width: number
  height: number
}

function getWindowDimensions(): WindowDimensions {
  if (typeof window === 'undefined') return { width: 1920, height: 1080 }
  const { innerWidth: width, innerHeight: height } = window
  return {
    width,
    height,
  }
}

export default function useWindowDimensions(): WindowDimensions {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  )

  useEffect(() => {
    function handleResize(): void {
      setWindowDimensions(getWindowDimensions())
    }

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return windowDimensions
}
