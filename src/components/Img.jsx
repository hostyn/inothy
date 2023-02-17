import Image from 'next/image'
import styled from 'styled-components'

const ImageDiv = styled.div`
  position: relative;
  width: ${(props) => props.width || '100%'};
  height: ${(props) => props.height || '100%'};
  aspect-ratio: ${(props) => props.aspectRatio || 'auto'};
  margin: ${(props) => props.margin || 'initial'};
  cursor: ${(props) => props.cursor || 'inherit'};
  align-self: ${(props) => props.alignSelf || 'initial'};
  user-select: none;
`

export default function Img ({
  src,
  alt,
  width,
  height,
  aspectRatio,
  margin,
  onClick,
  cursor,
  className,
  priority,
  alignSelf,
  title
}) {
  return (
    <ImageDiv
      className={className}
      width={width}
      height={height}
      aspectRatio={aspectRatio}
      margin={margin}
      onClick={onClick}
      cursor={cursor}
      alignSelf={alignSelf}
      title={title}
    >
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
