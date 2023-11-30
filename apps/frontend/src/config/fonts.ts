import { Nunito, Nunito_Sans } from 'next/font/google'

export const nunito = Nunito({ subsets: ['latin'] })
export const nunitoSans = Nunito_Sans({
  subsets: ['latin'],
  variable: '--nunito-sans',
})
