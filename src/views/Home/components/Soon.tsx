import SoonCarousel from '@components/SoonCarousel/SoonCarousel'
import useWindowDimensions from '@hooks/useWindowDimensions'

export default function Soon(): JSX.Element {
  const { width } = useWindowDimensions()

  return <SoonCarousel visualizedItems={width > 900 ? 2 : 1} />
}
