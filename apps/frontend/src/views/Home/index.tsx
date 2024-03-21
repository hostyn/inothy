import App from '@components/App'
import { PageSpacing } from '@ui/PageSpacing'
import Hero from './components/Hero'
import MakeMoney from './components/MakeMoney'
import FreePrice from './components/FreePrice'
import { css } from '@styled-system/css'
import Fast from './components/Fast'
import Experts from './components/Experts'
import YourBuddy from './components/YourBuddy'
import BestPlace from './components/BestPlace'
import BestOption from './components/BestOption'

export default function Home(): JSX.Element {
  return (
    <App>
      <PageSpacing
        className={css({
          display: 'flex',
          flexDir: 'column',
          gap: '256px',
        })}
      >
        <Hero />
        <MakeMoney />
        <FreePrice />
        <Fast />
        <Experts />
        <YourBuddy />
        <BestPlace />
        <BestOption />
      </PageSpacing>
    </App>
  )
}
