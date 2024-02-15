import { useState } from 'react'
import { css, cx } from '@styled-system/css'
import { Root as TabsRoot } from '@radix-ui/react-tabs'
import { pageSpacingStyles } from '@ui/PageSpacing'
import { Separator } from '@ui/Separator'
import useAuth from '@hooks/useAuth'
import type { KYCData, Step } from './types'
import StepCard from './Step'
import TabContent from './TabContent'
import PersonalInfoIcon from './icons/PersonalInfo'
import AddressIcon from './icons/Address'
import DocumentIcon from './icons/Document'
import PersionalInfo from './steps/PersonalInfo'
import Address from './steps/Address'
import AllowedDocuments from './steps/AllowedDocuments'
import ForbiddenDocuments from './steps/ForbiddenDocuments'
import DocumentType from './steps/DocumentType'
import DocumentUpload from './steps/DocumentUpload'
import { useRouter } from 'next/router'

const STEPS: Step[] = [
  {
    number: 1,
    title: 'Datos Personales',
    description: 'Necesitamos saber un poco más sobre tí.',
    Icon: PersonalInfoIcon,
    steps: [PersionalInfo],
  },
  {
    number: 2,
    title: 'Dirección',
    description: 'Dónde vives y de que país eres.',
    Icon: AddressIcon,
    steps: [Address],
  },
  {
    number: 3,
    title: 'Documento oficial',
    description: 'Sube un documento oficial.',
    Icon: DocumentIcon,
    steps: [AllowedDocuments, ForbiddenDocuments, DocumentType, DocumentUpload],
  },
]

export default function KYCForm(): JSX.Element {
  const { userData } = useAuth()
  const { push } = useRouter()
  const [data, setData] = useState<KYCData>(null)
  const [step, setStep] = useState('intro')

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
      STEPS.find(step => step.number === stepNumber)?.steps.length ?? 0

    if (substepNumber === totalSubsteps - 1) {
      const newStepNumber =
        stepNumber === (STEPS.at(-1)?.number as number) ? 'end' : stepNumber + 1
      setStep(newStepNumber === 'end' ? 'end' : `${newStepNumber}.0`)
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
      if (
        stepNumber === 0 ||
        ((userData?.canUpload ?? false) && stepNumber === 1)
      ) {
        setStep('intro')
      } else {
        const newSubstepNumber =
          (STEPS.find(step => step.number === stepNumber - 1)?.steps.length ??
            1) - 1
        setStep(`${stepNumber - 1}.${newSubstepNumber}`)
      }
    } else {
      setStep(`${stepNumber}.${substepNumber - 1}`)
    }
  }

  return (
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
            gap: 'xl',
          })}
        >
          <div>
            <h1
              className={css({
                fontSize: '4xl',
                lineHeight: '100%',
                color: 'text',
                width: 'fit-content',
                fontFamily: 'nunitoSans',
              })}
            >
              Completa tu perfil para retirar tu dinero
            </h1>
          </div>

          <ul
            className={css({
              display: 'flex',
              flexDirection: 'column',
              gap: 'xl',
            })}
          >
            {STEPS.map((step, index) => (
              <div
                key={step.number}
                className={css({
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'xl',
                })}
              >
                <StepCard
                  key={step.number}
                  number={step.number}
                  title={step.title}
                  description={step.description}
                  Icon={step.Icon}
                />
                {index !== STEPS.length - 1 && <Separator />}
              </div>
            ))}
          </ul>
        </div>
      </TabContent>

      <TabContent
        value="end"
        onSubmit={e => {
          e.preventDefault()
          void push('/account/balance')
        }}
        nextText="Terminar"
      >
        <div
          className={css({
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 'sm',
          })}
        >
          <h1
            className={css({
              fontSize: '2xl',
              fontWeight: '700',
              lineHeight: '100%',
              textAlign: 'center',
              color: 'text',
              fontFamily: 'nunitoSans',
            })}
          >
            ¡Verificación completada!
          </h1>
          <p
            className={css({
              fontSize: 'lg',
              maxWidth: '50ch',
              fontWeight: '400',
              lineHeight: '100%',
              textAlign: 'center',
              color: 'grey.500',
            })}
          >
            Tenemos que revisar tus documentos. Te enviaremos un email en cuanto
            lo hagamos.
          </p>
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
            steps={STEPS}
          />
        ))
      )}
    </TabsRoot>
  )
}
