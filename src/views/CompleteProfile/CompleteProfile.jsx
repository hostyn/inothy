import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import Text from '../../components/Text'
import { useAuth } from '../../context/authContext'
import { colors } from '../../config/theme'
import { completeProfile, getUniversities } from '../../util/api'
import State1PersonalData from './State1PersonalData'
import State2University from './State2University'
import State3School from './State3School'
import State4Degrees from './State4Degree'
import State5Success from './State5Success'
import Loading from '../../components/Loading'
import State6Error from './State6Error'
import State0CompleteProfile from './State0CompleteProfile'
import LoadingPage from '../../components/LoadingPage'

const CompleteProfileDiv = styled.div`
  background-image: url("/resources/completeprofile/background.svg");
  background-repeat: no-repeat;
  background-size: 90%;
  background-position: 50% calc(-150px - 50vh);

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

const Form = styled.div`
  min-width: 100%;
  max-width: 100%;
  min-height: 100%;
  max-height: 100%;
  display: grid;
  grid-template-columns: 60% 1fr;
  gap: 3rem;
  background-color: white;
  box-shadow: 0 0 10px 10px ${colors.shadow};
  border-radius: 10px;
  padding: 3rem;

  @media (max-width: 1000px) {
    grid-template-columns: 1fr;
  }

  @media (max-width: 500px) {
    padding: 2rem;
  }
`

const MotionDiv = styled(motion.div)`
  display: flex;
  max-height: calc(100vh - 16rem);
  min-height: inherit;
`

const Summary = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: ${colors.hover};
  border-radius: 10px;
  box-shadow: 0 0 15px 5px ${colors.shadow};
  padding: 2rem;

  @media (max-width: 1000px) {
    display: none;
  }
`

const SummaryCard = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  border: 2px solid ${colors.primary};
  padding: 1rem;
  background-color: ${colors.white};
  cursor: pointer;
`

export default function CompleteProfileView () {
  const { user, updateData, isLoading, isUser } = useAuth()
  const { push } = useRouter()
  const [state, setState] = useState('completeProfile')
  const [apiData, setApiData] = useState({
    universities: null,
    schools: null,
    degrees: null
  })

  const [userData, setUserData] = useState({
    name: '',
    surname: '',
    username: user?.data?.username || '',
    biography: '',
    address1: '',
    address2: '',
    city: '',
    region: '',
    postalCode: '',
    personalDataCompleted: false,
    completeProfileCompleted: false,
    university: null,
    universityName: '',
    school: null,
    schoolName: '',
    degree: null,
    degreeName: ''
  })

  const submit = () => {
    setState('loading')
    completeProfile(user, userData)
      .then(() => setState('success'))
      .then(() => new Promise((resolve) => setTimeout(resolve, 2000)))
      .then(() => updateData())
      .then(() => push('/'))
      .catch((e) => {
        console.log(e)
        setState('error')
      })
    // TODO: Handle errors
  }

  useEffect(() => {
    getUniversities().then((data) => {
      setApiData((apiData) => ({ ...apiData, universities: data }))
    })
  }, [])

  if (isLoading) {
    return <LoadingPage />
  }

  if (!user) {
    push('/')
    return <LoadingPage />
  }

  if (isUser) {
    push('/')
    return <LoadingPage />
  }

  return (
    <CompleteProfileDiv>
      <Form>
        <MotionDiv
          key={state}
          animate={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0, x: 20 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.15 }}
        >
          {state === 'completeProfile' && (
            <State0CompleteProfile
              userData={userData}
              setUserData={setUserData}
              setState={setState}
            />
          )}
          {state === 'personalData' && (
            <State1PersonalData
              userData={userData}
              setUserData={setUserData}
              setState={setState}
            />
          )}
          {state === 'university' && (
            <State2University
              universities={apiData.universities}
              userData={userData}
              setUserData={setUserData}
              setState={setState}
              setApiData={setApiData}
            />
          )}
          {state === 'school' && (
            <State3School
              schools={apiData.schools}
              userData={userData}
              setUserData={setUserData}
              setState={setState}
              setApiData={setApiData}
            />
          )}
          {state === 'degree' && (
            <State4Degrees
              degrees={apiData.degrees}
              userData={userData}
              setUserData={setUserData}
              setState={setState}
              submit={submit}
            />
          )}
          {state === 'loading' && <Loading />}
          {state === 'success' && <State5Success />}
          {state === 'error' && <State6Error setState={setState} />}
        </MotionDiv>
        <Summary>
          {userData.completeProfileCompleted && (
            <SummaryCard onClick={() => setState('completeProfile')}>
              <Text cursor="inherit" color="secondary">
                Perfil
              </Text>
              <Text cursor="inherit">@{userData.username}</Text>
              <Text cursor="inherit">
                {userData.biography.length > 20
                  ? userData.biography.substr(0, 20) + '...'
                  : userData.biography}
              </Text>
            </SummaryCard>
          )}
          {userData.personalDataCompleted && (
            <SummaryCard onClick={() => setState('personalData')}>
              <Text cursor="inherit" color="secondary">
                Información Personal
              </Text>
              <Text cursor="inherit">
                {userData.name} {userData.surname}
              </Text>
              <Text cursor="inherit">@{userData.username}</Text>
              <Text cursor="inherit">
                {userData.address1}
                {userData.address2 ? `, ${userData.address2}` : ''},{' '}
                {userData.city}, {userData.region}, {userData.postalCode},
                España
              </Text>
            </SummaryCard>
          )}
          {userData.university && (
            <SummaryCard onClick={() => setState('university')}>
              <Text cursor="inherit" color="secondary">
                Universidad
              </Text>
              <Text cursor="inherit">{userData.universityName}</Text>
            </SummaryCard>
          )}
          {userData.school && (
            <SummaryCard onClick={() => setState('school')}>
              <Text cursor="inherit" color="secondary">
                Facultad
              </Text>
              <Text cursor="inherit">{userData.schoolName}</Text>
            </SummaryCard>
          )}
          {userData.degree && (
            <SummaryCard onClick={() => setState('degree')}>
              <Text cursor="inherit" color="secondary">
                Grado
              </Text>
              <Text cursor="inherit">{userData.degreeName}</Text>
            </SummaryCard>
          )}
        </Summary>
      </Form>
    </CompleteProfileDiv>
  )
}
