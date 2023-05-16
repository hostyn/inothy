import { useState } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { useAuth } from '@context/authContext'
import { colors } from '@config/theme'
import Loading from '@components/Loading'
import LoadingPage from '@components/LoadingPage'
import MotionDiv from '@components/MotionDiv'
import CompleteProfile from './CompleteProfile'
import PersonalData from './PersonalData'
import University from './University'
import Degree from './Degree'
import Success from './Success'
import Error from './Error'
import SummaryCard from './components/SummaryCard'
import School from './School'

const CompleteProfileDiv = styled.div`
  background-image: url('/resources/completeprofile/background.svg');
  background-repeat: no-repeat;
  background-size: 90%;
  background-position: 50% calc(-150px - 50vh);
  display: flex;

  max-height: 100vh;
  max-width: 100vw;
  min-height: max(100vh, 50rem);
  min-width: 100vw;
  padding: 5rem 10rem;
  display: flex;

  @media (max-width: 1300px) {
    padding: 5rem;
  }

  @media (max-width: 768px) {
    padding: 3rem;
    min-height: max(100vh, 58rem);
  }

  @media (max-width: 500px) {
    padding: 2rem;
  }
`

const Grid = styled.div`
  min-width: 100%;
  max-width: 100%;
  min-height: 100%;
  max-height: 100%;
  display: grid;
  grid-template-columns: 60% 1fr;
  grid-auto-rows: 100%;
  gap: 3rem;
  background-color: white;
  box-shadow: 0 0 10px 10px ${colors.shadow};
  border-radius: 10px;
  padding: 3rem;
  overflow: hidden;

  @media (max-width: 1000px) {
    grid-template-columns: 1fr;
  }

  @media (max-width: 500px) {
    padding: 2rem;
  }
`

const Summary = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: ${colors.hover};
  border-radius: 10px;
  box-shadow: 0 0 15px 5px ${colors.shadow};
  padding: 2rem;
  overflow: hidden;

  @media (max-width: 1000px) {
    display: none;
  }
`

const StyledMotionDiv = styled(MotionDiv)`
  display: flex;
  max-height: 100%;
`

export interface CompleteProfileBaseProps {
  userData: CompleteUserData
  setUserData: React.Dispatch<React.SetStateAction<CompleteUserData>>
  setState: React.Dispatch<React.SetStateAction<State>>
}

export type State =
  | 'completeProfile'
  | 'personalData'
  | 'university'
  | 'school'
  | 'degree'
  | 'loading'
  | 'success'
  | 'error'

export interface CompleteUserData {
  username?: string
  biography?: string
  name?: string
  surname?: string
  address1?: string
  address2?: string
  city?: string
  postalCode?: string
  region?: string
  university?: string
  universityName?: string
  school?: string
  schoolName?: string
  degree?: string
  degreeName?: string
  personalDataCompleted: boolean
  completeProfileCompleted: boolean
}

export default function CompleteProfileView(): JSX.Element {
  const { user, isLoading, isUser } = useAuth()
  const { push } = useRouter()
  const [state, setState] = useState<State>('completeProfile')

  const [userData, setUserData] = useState<CompleteUserData>({
    personalDataCompleted: false,
    completeProfileCompleted: false,
  })

  if (isLoading) {
    return <LoadingPage />
  }

  if (user == null) {
    void push('/')
    return <LoadingPage />
  }

  if (isUser) {
    void push('/')
    return <LoadingPage />
  }

  return (
    <CompleteProfileDiv>
      <Grid>
        <StyledMotionDiv state={state}>
          {state === 'completeProfile' && (
            <CompleteProfile
              userData={userData}
              setUserData={setUserData}
              setState={setState}
            />
          )}
          {state === 'personalData' && (
            <PersonalData
              userData={userData}
              setUserData={setUserData}
              setState={setState}
            />
          )}
          {state === 'university' && (
            <University
              userData={userData}
              setUserData={setUserData}
              setState={setState}
            />
          )}
          {state === 'school' && (
            <School
              userData={userData}
              setUserData={setUserData}
              setState={setState}
            />
          )}
          {state === 'degree' && (
            <Degree
              userData={userData}
              setUserData={setUserData}
              setState={setState}
            />
          )}
          {state === 'loading' && <Loading />}
          {state === 'success' && <Success />}
          {state === 'error' && <Error setState={setState} />}
        </StyledMotionDiv>
        <Summary>
          {userData.completeProfileCompleted && (
            <SummaryCard
              title="Información de usuario"
              onClick={() => {
                setState('completeProfile')
              }}
              elements={[
                `@${userData.username ?? ''}`,
                userData.biography ?? '',
              ]}
            />
          )}
          {userData.personalDataCompleted && (
            <SummaryCard
              title="Información personal"
              onClick={() => {
                setState('personalData')
              }}
              elements={[
                `${userData.name ?? ''} ${userData.surname ?? ''}`,
                `${userData.address1 ?? ''}, ${userData.address2 ?? ''}`,
                `${userData.city ?? ''}, ${userData.region ?? ''}, ${
                  userData.postalCode ?? ''
                }`,
                'España',
              ]}
            />
          )}
          {userData.university != null && (
            <SummaryCard
              title="Universidad"
              onClick={() => {
                setState('university')
              }}
              elements={[userData.universityName ?? '']}
            />
          )}
          {userData.school != null && (
            <SummaryCard
              title="Facultad"
              onClick={() => {
                setState('school')
              }}
              elements={[userData.schoolName ?? '']}
            />
          )}
          {userData.degree != null && (
            <SummaryCard
              title="Grado"
              onClick={() => {
                setState('degree')
              }}
              elements={[userData.degreeName ?? '']}
            />
          )}
        </Summary>
      </Grid>
    </CompleteProfileDiv>
  )
}
