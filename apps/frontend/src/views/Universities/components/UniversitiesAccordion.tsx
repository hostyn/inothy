import * as Accordion from '@radix-ui/react-accordion'
import { trpc } from '@services/trpc'
import { css } from '@styled-system/css'
import Image from 'next/image'
import React from 'react'
import SchoolsAccordion from './SchoolsAccordion'
import { LiaAngleDownSolid } from 'react-icons/lia'

export default function UniversitiesAccordion(): JSX.Element {
  const { data: universities } = trpc.universities.getUniversities.useQuery()

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
                })}
                size={16}
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
    <Accordion.Header className={css({})}>
      <Accordion.Trigger
        {...props}
        ref={forwardedRef}
        className={css({
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
          alignItems: 'center',
          borderRadius: 'md',
          bg: 'grey.100',
          padding: 'sm',
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
      <div className="AccordionContentText">{children}</div>
    </Accordion.Content>
  )
)
