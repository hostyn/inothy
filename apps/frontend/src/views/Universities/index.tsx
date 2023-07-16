import App from '@components/App'
import { css } from '@styled-system/css'
import SearchBar from '@ui/SearchBar'
import { LiaUniversitySolid } from 'react-icons/lia'
import UniversitiesAccordion from './components/UniversitiesAccordion'
import { AppContext } from '@ui/AppContext'
import { Separator } from '@ui/Separator'

export default function UniversitiesView(): JSX.Element {
  return (
    <App>
      <AppContext>
        <div
          className={css({
            py: 'md',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          })}
        >
          <div
            className={css({
              display: 'flex',
              alignItems: 'center',
              gap: 'sm',
            })}
          >
            <LiaUniversitySolid
              size={24}
              className={css({ fill: 'primary.500' })}
            />
            <h1 className={css({ fontSize: 'xl', color: 'primary.500' })}>
              Universidades
            </h1>
          </div>

          <SearchBar />
        </div>

        <Separator />

        <UniversitiesAccordion />
      </AppContext>
    </App>
  )
}

// eslint-disable-next-line react/display-name
