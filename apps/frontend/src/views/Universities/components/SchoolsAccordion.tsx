import * as Accordion from '@radix-ui/react-accordion'
import { css } from '@styled-system/css'
import type { RouterOutputs } from 'backend'
import Link from 'next/link'
import React from 'react'
import { LiaAngleDownSolid } from 'react-icons/lia'

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
      defaultValue={schools?.[0]?.id}
    >
      {schools.map(school => (
        <Accordion.Item
          key={school.id}
          value={school.id}
          className={css({
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            gap: 'xs',
          })}
        >
          <SchoolTrigger>
            <div
              className={css({
                display: 'flex',
                alignItems: 'center',
                gap: 'sm',
              })}
            >
              <LiaAngleDownSolid
                className={css({
                  fill: 'primary.500',
                  transition: 'transform 300ms cubic-bezier(0.87, 0, 0.13, 1)',
                  transform: 'rotate(-90deg)',
                })}
                size={18}
              />
              <p className={css({ color: 'primary.500', fontWeight: '600' })}>
                {school.name}
              </p>
            </div>
          </SchoolTrigger>
          <SchoolContent>
            {school.degrees.map(degree => (
              <div key={degree.id}>
                <Link
                  href={`/degree/${degree.id}`}
                  className={css({
                    color: 'primary.500',
                    borderRadius: 'md',

                    _hover: {
                      textDecoration: 'underline',
                    },

                    _focusVisible: {
                      outline: '3px solid token(colors.primary.300)',
                      outlineOffset: '-3px',
                    },
                  })}
                >
                  {degree.name}
                </Link>
              </div>
            ))}
          </SchoolContent>
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
    <Accordion.Header>
      <Accordion.Trigger
        {...props}
        ref={forwardedRef}
        className={css({
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
          alignItems: 'center',
          cursor: 'pointer',
          borderRadius: 'md',

          _focusVisible: {
            outline: '3px solid token(colors.primary.300)',
            outlineOffset: '-3px',
          },

          '&[data-state="open"] div > svg': {
            transform: 'rotate(0)',
          },
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
    }: { children: JSX.Element[]; className?: string },
    forwardedRef: React.Ref<HTMLDivElement>
  ) => (
    <Accordion.Content
      {...props}
      ref={forwardedRef}
      className={css({
        paddingLeft: 'xl',
        gap: 'xl',

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
