import DocumentIcon from '@components/DocumentIcons'
import Logo from '@components/Logo'
import { css } from '@styled-system/css'

interface NoPreviewProps {
  mimeType: string
}

export default function NoPreview({ mimeType }: NoPreviewProps): JSX.Element {
  return (
    <div
      className={css({
        display: 'flex',
        flexDir: 'column',
        gap: 'md',
        justifyContent: 'center',
        alignItems: 'center',
        width: 'inherit',
        height: 'inherit',
        fontSize: 'token(sizes.sm)',
        fontWeight: '600',
      })}
    >
      <DocumentIcon mimeType={mimeType} />
      <span
        className={css({
          color: 'primary.500',
          fontSize: 'lg',
          width: '80%',
          textAlign: 'center',
        })}
      >
        Este documento no tiene previsualización.
      </span>
      <div
        className={css({
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%) rotate(16deg)',
          width: '100%',
          opacity: '0.1',
          zIndex: '-1',
        })}
      >
        <Logo width="100%" />s
      </div>
    </div>
  )
}
