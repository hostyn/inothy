import App from '@components/App'
import { css, cx } from '@styled-system/css'
import { pageSpacingStyles } from '@ui/PageSpacing'
import { Separator } from '@ui/Separator'
import { Root as TabsRoot } from '@radix-ui/react-tabs'
import ListIcon from './icons/List'
import UploadIcon from './icons/Upload'
import DocumentIcon from './icons/Document'
import PiggyIcon from './icons/Piggy'
import { useState } from 'react'
import PersonalInfo from './components/PersonalInfo'
import Address from './components/Address'
import Step from './Step'
import type { UploadData } from './types'
import TabContent from './TabContent'

const STEPS = [
  {
    number: 0,
    title: 'Completa tu perfil',
    steps: [PersonalInfo, Address, PersonalInfo],
  },
  {
    number: 1,
    title: 'Sube tu documento',
    steps: [PersonalInfo, PersonalInfo, PersonalInfo],
  },
  {
    number: 2,
    title: 'Haz que destaque',
    steps: [PersonalInfo, PersonalInfo, PersonalInfo],
  },
  {
    number: 3,
    title: 'Ponles precio',
    steps: [PersonalInfo, PersonalInfo, PersonalInfo],
  },
]

export default function Upload(): JSX.Element {
  const [data, setData] = useState<UploadData>(null)
  const [step, setStep] = useState('intro')

  const nextStep = (): void => {
    if (step === 'intro') {
      setStep('0.0')
      return
    }

    if (step === 'end') {
      setStep('intro')
      return
    }

    const [stepNumber, substepNumber] = step.split('.').map(Number)
    const totalSubsteps = STEPS[stepNumber].steps.length

    if (substepNumber === totalSubsteps - 1) {
      const newStepNumber =
        stepNumber === STEPS.length - 1 ? 'end' : stepNumber + 1
      setStep(`${newStepNumber}.0`)
    } else {
      setStep(`${stepNumber}.${substepNumber + 1}`)
    }
  }

  const prevStep = (): void => {
    if (step === 'intro') return

    if (step === 'end') {
      const lastStepNumber = STEPS.length - 1
      const lastSubstepNumber = STEPS[lastStepNumber].steps.length - 1
      setStep(`${lastStepNumber}.${lastSubstepNumber}`)
      return
    }

    const [stepNumber, substepNumber] = step.split('.').map(Number)

    if (substepNumber === 0) {
      if (stepNumber === 0) {
        setStep('intro')
      } else {
        setStep(`${stepNumber - 1}.0`)
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
              <Step
                number={0}
                title="Completa tu perfil"
                description="Necesitamos un poco de información sobre tí."
                Icon={ListIcon}
              />

              <Separator />
              <Step
                number={1}
                title="Sube tu documento"
                description="Sube tus documetos arrastrandolos al navegador."
                Icon={UploadIcon}
              />
              <Separator />
              <Step
                number={2}
                title="Haz que destaque"
                description="Rellena información sobre el documento, título, descripción, asignatura..."
                Icon={DocumentIcon}
              />
              <Separator />
              <Step
                number={3}
                title="Ponles precio"
                description="Ponles precio y gana dinero."
                Icon={PiggyIcon}
              />
            </ul>
          </div>
        </TabContent>

        {STEPS.map(step =>
          step.steps.map((Substep, index) => (
            <Substep
              key={`${step.number}.${index}`}
              value={`${step.number}.${index}`}
              next={nextStep}
              prev={prevStep}
              setData={setData}
              data={data}
              title={`Paso ${step.number}: ${step.title}`}
            />
          ))
        )}
      </TabsRoot>
    </App>
  )
}
