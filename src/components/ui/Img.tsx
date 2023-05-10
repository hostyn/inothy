import Image from 'next/image'
import { type ForwardedRef, forwardRef } from 'react'
import styled from 'styled-components'

interface ImageDivProps {
  width?: string
  height?: string
  aspectRatio?: string
  margin?: string
  cursor?: string
  alignSelf?: string
  minHeight?: string
  minWidth?: string
}

interface ImgProps extends ImageDivProps {
  src: string
  alt?: string
  onClick?: () => unknown
  className?: string
  priority?: boolean
  title?: string
}

const ImageDiv = styled.div<ImageDivProps>`
  position: relative;
  width: ${props => props.width ?? '100%'};
  height: ${props => props.height ?? '100%'};
  aspect-ratio: ${props => props.aspectRatio ?? 'auto'};
  margin: ${props => props.margin ?? 'initial'};
  cursor: ${props => props.cursor ?? 'inherit'};
  align-self: ${props => props.alignSelf ?? 'initial'};
  user-select: none;
  min-height: ${props => props.minHeight ?? 'initial'};
  min-width: ${props => props.minWidth ?? 'initial'};
`

function Img(
  { src, alt, priority, ...props }: ImgProps,
  ref: ForwardedRef<HTMLDivElement>
): JSX.Element {
  return (
    <ImageDiv {...props} ref={ref}>
      <Image
        src={src}
        layout="fill"
        alt={alt}
        draggable="false"
        priority={priority}
      />
    </ImageDiv>
  )
}

export default forwardRef(Img)
