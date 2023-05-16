import { colors } from '@config/theme'
import { Img } from '@ui'
import mimeTypes from '@util/mimeTypes'
import styled from 'styled-components'

const NoPreviewDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 3px solid ${colors.primary};
  width: 25vw;
  height: calc(25vw * 25 / 19);

  @media (max-width: 1200px) {
    width: 40vw;
    height: calc(40vw * 25 / 19);
  }

  @media (max-width: 768px) {
    width: calc(100vw - 4rem);
    height: calc((100vw - 4rem) * 25 / 19);
  }
`

interface NoPreviewProps {
  mimeType: string
}

export default function NoPreview({ mimeType }: NoPreviewProps): JSX.Element {
  return (
    <NoPreviewDiv>
      <Img
        src={`/icons/files/${
          mimeTypes[mimeType as keyof typeof mimeTypes] ?? 'file.svg'
        }`}
        width="50%"
        height="100%"
      />
    </NoPreviewDiv>
  )
}
