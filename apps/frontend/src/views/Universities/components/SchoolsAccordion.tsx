import * as Accordion from '@radix-ui/react-accordion'
import { css } from '@styled-system/css'
import type { RouterOutputs } from 'backend'
import React from 'react'

export default function SchoolsAccordion({
  schools,
}: {
  schools: RouterOutputs['universities']['getUniversities'][number]['schools']
}): JSX.Element {
  return (
    <Accordion.Root
      className={css({
        display: 'flex',
        flexDirection: 'column',
        paddingLeft: 'md',
        paddingBottom: 'xs',
        gap: 'xs',
      })}
      type="single"
      collapsible
    >
      {schools.map(school => (
        <Accordion.Item key={school.id} value={school.id}>
          <SchoolTrigger>
            <p>{school.name}</p>
          </SchoolTrigger>
          {school.degrees.map(degree => (
            <SchoolContent key={degree.id}>
              <p>{degree.name}</p>
            </SchoolContent>
          ))}
        </Accordion.Item>
      ))}
    </Accordion.Root>
  )
}

// eslint-disable-next-line react/display-name
const SchoolTrigger = React.forwardRef(
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
        })}
      >
        {children}
      </Accordion.Trigger>
    </Accordion.Header>
  )
)

// eslint-disable-next-line react/display-name
const SchoolContent = React.forwardRef(
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
