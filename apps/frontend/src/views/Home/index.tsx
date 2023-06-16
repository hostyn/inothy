import App from '@components/App'
import styled from 'styled-components'
import Welcome from './components/Welcome'
import WhyInothy from './components/WhyInothy'
import NeedHelp from './components/NeedHelp'
import Universities from './components/Universities'
import GetDocuments from './components/GetDocuments'
import Pass from './components/Pass'
import BestDocuments from './components/BestDocuments'
import Soon from './components/Soon'

const HomeDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 5rem;
  padding: 0 5rem;

  @media (max-width: 1000px) {
    margin: 0 3rem;
    padding: 0;
  }

  @media (max-width: 768px) {
    margin: 0;
    padding: 0 2rem;
  }
`

export default function HomeView(): JSX.Element {
  return (
    <App transparent>
      <Welcome />
      <HomeDiv>
        <WhyInothy />

        <NeedHelp />

        <Universities />

        <GetDocuments />

        <Pass />

        <BestDocuments />

        <Soon />
      </HomeDiv>
    </App>
  )
}
