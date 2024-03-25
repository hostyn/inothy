import Imagotipo from '@components/Imagotipo'
import { css, cx } from '@styled-system/css'
import { pageWidthStyles } from '@ui/PageSpacing'
import { AiOutlineInstagram, AiOutlineYoutube } from 'react-icons/ai'
import { RiTiktokFill } from 'react-icons/ri'

const rrssStyle = css({
  bg: 'grey.700',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: 'token(spacing.xl)',
  height: 'token(spacing.xl)',
  borderRadius: 'md',
  cursor: 'pointer',

  _focus: {
    outline: '3px solid token(colors.primary.300)',
  },
})

export default function Footer(): JSX.Element {
  return (
    <footer
      className={cx(
        pageWidthStyles,
        css({
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: 'token(spacing.6xl)',
          margin: 'auto',
        })
      )}
    >
      <Imagotipo
        footer
        className={css({
          // display: 'none',
          md: {
            display: 'block',
          },
        })}
      />
      {/* <Imagotipo
        footer
        onlyLogo
        className={css({
          md: {
            display: 'none',
          },
        })} 
      /> */}
      {/* <Link visual="footer" href="/legal">
        Términos y condiciones
      </Link>
      <Link visual="footer" href="/privacy">
        Política de privacidad
      </Link>
      <Link visual="footer" href="/cookies">
        Cookies
      </Link> */}
      <div className={css({ display: 'flex', gap: 'sm' })}>
        <a
          className={rrssStyle}
          href="https://youtube.com/@_inothy"
          target="_blank"
          rel="noreferrer"
          aria-label="Youtube"
        >
          <AiOutlineYoutube color="white" size={20} />
        </a>
        <a
          className={rrssStyle}
          href="https://www.instagram.com/_inothy/"
          target="_blank"
          rel="noreferrer"
          aria-label="Instagram"
        >
          <AiOutlineInstagram color="white" size={20} />
        </a>
        <a
          className={rrssStyle}
          href="https://www.tiktok.com/@_inothy"
          target="_blank"
          rel="noreferrer"
          aria-label="TikTok"
        >
          <RiTiktokFill color="white" size={20} />
        </a>
      </div>
    </footer>
  )
}
