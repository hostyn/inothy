import App from '@components/App'
import { LiaUniversitySolid } from 'react-icons/lia'
import UniversitiesAccordion from './components/UniversitiesAccordion'
import PageLayout from '@ui/PageLayout'

export default function UniversitiesView(): JSX.Element {
  return (
    <App>
      <PageLayout title="Universidades" Icon={LiaUniversitySolid} searchBar>
        <UniversitiesAccordion />
      </PageLayout>
    </App>
  )
}
