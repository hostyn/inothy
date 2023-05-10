import styled from 'styled-components'
import { useState } from 'react'
import { useAuth } from '@context/authContext'
import App from '@components/App'
import CompleteProfileInfo from './CompleteProfileInfo'
import Loading from '@components/Loading'
import Success from './Success'
import Error from './Error'
import Verified from './Verified'
import Pending from './Pending'
import { completeKYC } from '@util/api'
import { colors, sizes } from '@config/theme'
import UploadAccepted from './UploadAccepted'
import UploadRejected from './UploadRejected'
import DocumentSelection from './DocumentSelection'
import Dni from './Dni'
import Passport from './Passport'
import MotionDiv from '@components/MotionDiv'
import type { CountryISO } from 'mangopay2-nodejs-sdk'

const UploadDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin: 3rem ${sizes.inlineMargin};

  border: 3px solid ${colors.primary};
  border-radius: 20px;
  min-height: calc(100vh - ${sizes.navbar} - 6rem);
  justify-content: center;

  width: 100%;

  @media (max-width: 1000px) {
    margin: 2rem;
    min-height: calc(100vh - ${sizes.navbar} - 4rem);
  }

  @media (max-width: 768px) {
    margin: 1rem;
    min-height: calc(100vh - ${sizes.navbar} - 2rem);
  }
`

const StyledMotionDiv = styled(MotionDiv)`
  display: flex;
  flex-direction: column;
  padding: 3rem 5rem;
  min-height: inherit;
  min-width: 100%;

  @media (max-width: 1200px) {
    padding: 2rem 3rem;
  }

  @media (max-width: 768px) {
    padding: 2rem;
  }
`

interface IUserData {
  name?: string
  surname?: string
  year?: number
  month?: number
  day?: number
  email?: string
  address1?: string
  address2?: string
  city?: string
  region?: string
  postalCode?: string
  country: 'ES'
  nationality: CountryISO
  countryOfResidence: 'ES'
}

type State =
  | 'verified'
  | 'pending'
  | 'completeProfileInfo'
  | 'uploadaccepted'
  | 'uploadrejected'
  | 'documentselection'
  | 'dni'
  | 'passport'
  | 'success'
  | 'error'
  | 'loading'

export interface KYCBaseProps {
  userData: IUserData
  setUserData: React.Dispatch<React.SetStateAction<IUserData>>
  setState: React.Dispatch<React.SetStateAction<State>>
}

export default function KYCView(): JSX.Element {
  const { user } = useAuth()
  const [state, setState] = useState<State>(
    user?.data?.mangopayKYCStatus === 'VALIDATED'
      ? 'verified'
      : user?.data?.mangopayKYCStatus === 'VALIDATION_ASKED'
      ? 'pending'
      : 'completeProfileInfo'
  )

  const [userData, setUserData] = useState<IUserData>({
    name: user?.data?.name,
    surname: user?.data?.surname,
    email: user?.email as string,
    address1: user?.data?.address?.address1,
    address2: user?.data?.address?.address2,
    city: user?.data?.address?.city,
    region: user?.data?.address?.region,
    postalCode: user?.data?.address?.postalCode,
    country: 'ES',
    nationality: 'ES',
    countryOfResidence: 'ES',
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
    day: new Date().getDay(),
  })

  return (
    <App>
      <UploadDiv>
        <StyledMotionDiv state={state}>
          {state === 'completeProfileInfo' && (
            <CompleteProfileInfo
              setUserData={setUserData}
              userData={userData}
              setState={setState}
            />
          )}
          {state === 'uploadaccepted' && <UploadAccepted setState={setState} />}
          {state === 'uploadrejected' && <UploadRejected setState={setState} />}
          {state === 'documentselection' && (
            <DocumentSelection setState={setState} />
          )}
          {state === 'dni' && <Dni setState={setState} userData={userData} />}
          {state === 'passport' && (
            <Passport setState={setState} userData={userData} />
          )}
          {state === 'success' && <Success />}
          {state === 'error' && <Error />}
          {state === 'verified' && <Verified />}
          {state === 'pending' && <Pending />}
          {state === 'loading' && <Loading />}
        </StyledMotionDiv>
      </UploadDiv>
    </App>
  )
}
