import { useState } from 'react'
import TabContent from '../TabContent'
import { FaAddressCard, FaPassport } from 'react-icons/fa'
import type { DocumentTypeStep, StepProps } from '../types'
import type { IconType } from 'react-icons/lib'
import type { CountryISO } from 'mangopay2-nodejs-sdk'
import { css } from '@styled-system/css'
import { NATIONAL_ID_ACCEPTED_COUNTRIES } from '@config/constants'
import { COUNTRIES } from '@config/countries'

export default function DocumentType({
  next,
  data,
  setData,
  ...props
}: StepProps): JSX.Element {
  const [selected, setSelected] = useState<null | 'id' | 'passport'>(null)

  const onSubmit = (): void => {
    if (selected == null) return
    setData((data: DocumentTypeStep) => ({
      ...data,
      documentType: selected,
      step: 'document-type',
    }))
    next()
  }

  return (
    <TabContent
      onSubmit={e => {
        e.preventDefault()
        onSubmit()
      }}
      disabled={selected == null}
      {...props}
    >
      <div
        className={css({
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 'xl',
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
          ¿Qué documento vas a subir?
        </h1>
        <div
          className={css({
            display: 'flex',
            flexDirection: 'column',
            gap: 'md',
            width: '100%',
            maxWidth: '20rem',
          })}
        >
          <DocumentTypeButton
            selected={selected === 'id'}
            disabled={
              !NATIONAL_ID_ACCEPTED_COUNTRIES.includes(
                data?.nationality as CountryISO
              )
            }
            title={
              !NATIONAL_ID_ACCEPTED_COUNTRIES.includes(
                data?.nationality as CountryISO
              )
                ? `No aceptamos documentos de identidad de ${
                    COUNTRIES.find(country => country.iso === data?.nationality)
                      ?.name ?? 'este país'
                  }.`
                : undefined
            }
            text="Documento de identidad"
            Icon={FaAddressCard}
            onClick={() => {
              setSelected('id')
            }}
          />
          <DocumentTypeButton
            text="Pasaporte"
            selected={selected === 'passport'}
            Icon={FaPassport}
            onClick={() => {
              setSelected('passport')
            }}
          />
        </div>
      </div>
    </TabContent>
  )
}

const DocumentTypeButton = ({
  text,
  Icon,
  selected,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  text: string
  selected: boolean
  Icon: IconType
}): JSX.Element => (
  <button
    type="button"
    className={css({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      p: 'md',
      border: '1px solid token(colors.grey.100)',
      outline: selected ? '2px solid token(colors.primary.300)' : 'none',
      backgroundColor: selected ? 'token(colors.primary.100)' : 'transparent',
      rounded: 'md',
      width: '100%',
      color: 'grey.500',
      transitionProperty: 'outline-width, background-color',
      transitionDuration: '75ms',
      transitionTimingFunction: 'ease-in-out',

      _focusVisible: {
        outline: '3px solid token(colors.primary.300)',
        outlineOffset: '0',
      },

      _disabled: {
        bg: 'grey.100',
        color: 'grey.500',
      },
    })}
    {...props}
  >
    <span>{text}</span>
    <Icon size={24} />
  </button>
)
