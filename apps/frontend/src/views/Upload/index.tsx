import { useRef, useState } from 'react'
import { css, cx } from '@styled-system/css'
import { Root as TabsRoot } from '@radix-ui/react-tabs'
import { pageSpacingStyles } from '@ui/PageSpacing'
import { Separator } from '@ui/Separator'
import App from '@components/App'
import useAuth from '@hooks/useAuth'
import type { Step, UploadData } from './types'
import StepCard from './Step'
import TabContent from './TabContent'
import ListIcon from './icons/List'
import UploadIcon from './icons/Upload'
import DocumentIcon from './icons/Document'
import PiggyIcon from './icons/Piggy'
import PersonalInfo from './steps/PersonalInfo'
import Address from './steps/Address'
import PersonalInfoCompleted from './steps/PersonalInfoCompleted'
import UploadFile from './steps/UploadFile'
import Subject from './steps/Subject'
import DocumentType from './steps/DocumentType'
import TitleAndDescription from './steps/TitleAndDescription'
import MoreInfo from './steps/MoreInfo'
import Price from './steps/Price'

const STEPS: Step[] = [
  {
    number: 0,
    title: 'Completa tu perfil',
    steps: [PersonalInfo, Address, PersonalInfoCompleted],
  },
  {
    number: 1,
    title: 'Sube tu documento',
    steps: [UploadFile],
  },
  {
    number: 2,
    title: 'Haz que destaque',
    steps: [Subject, DocumentType, TitleAndDescription, MoreInfo],
  },
  {
    number: 3,
    title: 'Ponles precio',
    steps: [Price],
  },
]

export default function Upload(): JSX.Element {
  const { userData } = useAuth()
  const [data, setData] = useState<UploadData>(null)
  const [step, setStep] = useState('intro')
  const steps = useRef(
    userData?.canUpload ?? false ? STEPS.slice(1) : STEPS
  ).current

  const nextStep = (): void => {
    if (step === 'intro') {
      setStep(userData?.canUpload ?? false ? '1.0' : '0.0')
      return
    }

    if (step === 'end') {
      setStep('intro')
      return
    }

    const [stepNumber, substepNumber] = step.split('.').map(Number)
    const totalSubsteps =
      steps.find(step => step.number === stepNumber)?.steps.length ?? 0

    if (substepNumber === totalSubsteps - 1) {
      const newStepNumber =
        stepNumber === (steps.at(-1)?.number as number) ? 'end' : stepNumber + 1
      setStep(newStepNumber === 'end' ? 'end' : `${newStepNumber}.0`)
    } else {
      setStep(`${stepNumber}.${substepNumber + 1}`)
    }
  }

  const prevStep = (): void => {
    if (step === 'intro') return

    if (step === 'end') {
      const lastStepNumber = steps.length - 1
      const lastSubstepNumber = steps[lastStepNumber].steps.length - 1
      setStep(`${lastStepNumber}.${lastSubstepNumber}`)
      return
    }

    const [stepNumber, substepNumber] = step.split('.').map(Number)

    if (substepNumber === 0) {
      if (
        stepNumber === 0 ||
        ((userData?.canUpload ?? false) && stepNumber === 1)
      ) {
        setStep('intro')
      } else {
        const newSubstepNumber =
          (steps.find(step => step.number === stepNumber - 1)?.steps.length ??
            1) - 1
        setStep(`${stepNumber - 1}.${newSubstepNumber}`)
      }
    } else {
      setStep(`${stepNumber}.${substepNumber - 1}`)
    }
  }

  return (
    <App>
      <TabsRoot
        className={cx(
          pageSpacingStyles,
          css({
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',

            _focus: {
              outline: 'none',
            },
          })
        )}
        value={step}
      >
        <TabContent
          value="intro"
          nextText="Empezar"
          onSubmit={e => {
            e.preventDefault()
            nextStep()
          }}
        >
          <div
            className={css({
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              alignItems: 'center',
            })}
          >
            <div>
              <h1
                className={css({
                  fontSize: '5xl',
                  fontFamily: 'var(--nunito-sans)',
                  lineHeight: '100%',
                  color: 'text',
                  width: 'fit-content',
                })}
              >
                Subir tus apuntes <br /> es muy sencillo
              </h1>
            </div>

            <ul
              className={css({
                display: 'flex',
                flexDirection: 'column',
                gap: 'xl',
              })}
            >
              {!(userData?.canUpload ?? false) && (
                <>
                  <StepCard
                    number={0}
                    title="Completa tu perfil"
                    description="Necesitamos un poco de información sobre tí."
                    Icon={ListIcon}
                  />
                  <Separator />{' '}
                </>
              )}
              <StepCard
                number={1}
                title="Sube tu documento"
                description="Sube tus documetos arrastrandolos al navegador."
                Icon={UploadIcon}
              />
              <Separator />
              <StepCard
                number={2}
                title="Haz que destaque"
                description="Rellena información sobre el documento, título, descripción, asignatura..."
                Icon={DocumentIcon}
              />
              <Separator />
              <StepCard
                number={3}
                title="Ponles precio"
                description="Ponles precio y gana dinero."
                Icon={PiggyIcon}
              />
            </ul>
          </div>
        </TabContent>

        {steps.map(step =>
          step.steps.map((Substep, index) => (
            <Substep
              key={`${step.number}.${index}`}
              value={`${step.number}.${index}`}
              next={nextStep}
              prev={prevStep}
              setData={setData}
              data={data}
              title={`Paso ${step.number}: ${step.title}`}
              steps={steps}
            />
          ))
        )}
      </TabsRoot>
    </App>
  )
}
