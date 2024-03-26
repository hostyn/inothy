import * as Accordion from '@radix-ui/react-accordion'
import { trpc } from '@services/trpc'
import { css } from '@styled-system/css'
import Image from 'next/image'
import React from 'react'
import SchoolsAccordion from './SchoolsAccordion'
import { LiaAngleDownSolid } from 'react-icons/lia'

export default function UniversitiesAccordion(): JSX.Element {
  const { data: universities } = trpc.universities.getUniversities.useQuery(
    undefined,
    { cacheTime: 1000 * 60 }
  )

  return (
    <Accordion.Root
      className={css({
        display: 'flex',
        flexDirection: 'column',
        gap: 'xs',
      })}
      type="single"
      defaultValue={universities?.[0]?.id}
      collapsible
    >
      {universities?.map(university => (
        <Accordion.Item
          className={css({
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            gap: 'xs',
          })}
          value={university.id}
          key={university.id}
        >
          <UniversityTrigger>
            <div
              className={css({
                display: 'grid',
                gridTemplateColumns: '32px 1fr 18px',
                gap: 'sm',
                alignItems: 'center',
                width: '100%',
              })}
            >
              <Image
                src={university.logoUrl}
                alt={`Logo de la ${university.name}`}
                width={32}
                height={32}
                className={css({ borderRadius: 'md' })}
              />
              <h2
                title={university.name}
                className={css({
                  fontSize: 'lg',
                  fontWeight: '600',
                  color: 'primary.500',
                  textAlign: 'left',
                  lineHeight: '1.1',

                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  lineClamp: 2,
                  width: '100%',
                })}
              >
                {university.name}
              </h2>
              <LiaAngleDownSolid
                className={css({
                  fill: 'primary.500',
                  transition: 'transform 300ms cubic-bezier(0.87, 0, 0.13, 1)',
                  width: '18px',
                  height: '18px',
                })}
              />
            </div>
          </UniversityTrigger>

          <UniversityContent>
            <SchoolsAccordion schools={university.schools} />
          </UniversityContent>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  )
}

// eslint-disable-next-line react/display-name
const UniversityTrigger = React.forwardRef(
  (
    {
      children,
      className,
      ...props
    }: { children: JSX.Element; className?: string },
    forwardedRef: React.Ref<HTMLButtonElement>
  ) => (
    <Accordion.Header asChild>
      <Accordion.Trigger
        {...props}
        ref={forwardedRef}
        className={css({
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
          alignItems: 'center',
          borderRadius: 'md',
          padding: 'sm',
          cursor: 'pointer',
          transition: 'background-color 300ms cubic-bezier(0.87, 0, 0.13, 1)',

          _focusVisible: {
            outline: '3px solid token(colors.primary.300)',
            outlineOffset: '-3px',
          },

          '&[data-state="open"]': {
            bg: 'grey.100',
          },

          '&[data-state="open"] > svg': {
            transform: 'rotate(180deg)',
          },
        })}
      >
        {children}
      </Accordion.Trigger>
    </Accordion.Header>
  )
)

// eslint-disable-next-line react/display-name
const UniversityContent = React.forwardRef(
  (
    {
      children,
      className,
      ...props
    }: { children: JSX.Element; className?: string },
    forwardedRef: React.Ref<HTMLDivElement>
  ) => (
    <Accordion.Content
      {...props}
      ref={forwardedRef}
      className={css({
        '&[data-state="open"]': {
          animation: 'slideDown 300ms cubic-bezier(0.87, 0, 0.13, 1);',
        },

        '&[data-state="closed"]': {
          animation: 'slideUp 300ms cubic-bezier(0.87, 0, 0.13, 1);',
        },
      })}
    >
      {children}
    </Accordion.Content>
  )
)
