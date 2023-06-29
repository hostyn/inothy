import * as Accordion from '@radix-ui/react-accordion'
import { css } from '@styled-system/css'
import React from 'react'

export default function Test(): JSX.Element {
  return (
    <Accordion.Root
      className={css({
        borderRadius: '6px',
        width: '300px',
        bg: '#dddddd',
        boxShadow: '0 2px 10px black',
      })}
      type="single"
      defaultValue="item-1"
      collapsible
    >
      <Accordion.Item
        className={css({ overflow: 'hidden', marginTop: '1px' })}
        value="item-1"
      >
        <AccordionTrigger>
          <h1>Universidad de alicante</h1>
        </AccordionTrigger>
        <AccordionContent>
          <p>Escuela Politecnica Superior</p>
        </AccordionContent>
        <AccordionContent>
          <p>Derecho</p>
        </AccordionContent>
        <AccordionContent>
          <p>Ciencias Sociales</p>
        </AccordionContent>
      </Accordion.Item>

      <Accordion.Item
        className={css({ overflow: 'hidden', marginTop: '1px' })}
        value="item-2"
      >
        <AccordionTrigger>
          <h1>Universidad de alicante</h1>
        </AccordionTrigger>
        <AccordionContent>
          <p>Escuela Politecnica Superior</p>
        </AccordionContent>
        <AccordionContent>
          <p>Derecho</p>
        </AccordionContent>
        <AccordionContent>
          <p>Ciencias Sociales</p>
        </AccordionContent>
      </Accordion.Item>

      <Accordion.Item
        className={css({ overflow: 'hidden', marginTop: '1px' })}
        value="item-3"
      >
        <AccordionTrigger>
          <h1>Universidad de alicante</h1>
        </AccordionTrigger>
        <AccordionContent>
          <p>Escuela Politecnica Superior</p>
        </AccordionContent>
        <AccordionContent>
          <p>Derecho</p>
        </AccordionContent>
        <AccordionContent>
          <p>Ciencias Sociales</p>
        </AccordionContent>
      </Accordion.Item>
    </Accordion.Root>
  )
}

// eslint-disable-next-line react/display-name
const AccordionTrigger = React.forwardRef(
  (
    {
      children,
      className,
      ...props
    }: { children: JSX.Element; className?: string },
    forwardedRef
  ) => (
    <Accordion.Header className={css({ display: 'flex' })}>
      <Accordion.Trigger {...props} ref={forwardedRef}>
        {children}
      </Accordion.Trigger>
    </Accordion.Header>
  )
)

// eslint-disable-next-line react/display-name
const AccordionContent = React.forwardRef(
  (
    {
      children,
      className,
      ...props
    }: { children: JSX.Element; className?: string },
    forwardedRef
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
