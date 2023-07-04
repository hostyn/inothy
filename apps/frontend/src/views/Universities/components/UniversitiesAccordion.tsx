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
        py: 'md',
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
            <>
              <div
                className={css({
                  display: 'flex',
                  gap: 'sm',
                  alignItems: 'center',
                })}
              >
                <Image
                  src={university.logoUrl}
                  alt={`Logo de la ${university.name}`}
                  width={32}
                  height={32}
                  className={css({ borderRadius: 'md' })}
                />
                <p
                  className={css({
                    fontSize: 'lg',
                    fontWeight: '600',
                    color: 'primary.500',
                  })}
                >
                  {university.name}
                </p>
              </div>
              <LiaAngleDownSolid
                className={css({
                  fill: 'primary.500',
                  transition: 'transform 300ms cubic-bezier(0.87, 0, 0.13, 1)',
                })}
                size={18}
              />
            </>
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
    <Accordion.Header>
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
