import { trpc } from '@services/trpc'
import { css } from '@styled-system/css'
import * as Accordion from '@radix-ui/react-accordion'
import type { RouterOutputs } from 'backend'
import { useMemo } from 'react'
import { LiaAngleDownSolid } from 'react-icons/lia'
import FilterItem from './components/FilterItem'
import { LuBookMarked } from 'react-icons/lu'

const YEAR_NAMES = [
  'Cero',
  'Primero',
  'Segundo',
  'Tercero',
  'Cuarto',
  'Quinto',
  'Sexto',
  'Séptimo',
  'Octavo',
  'Noveno',
  'Décimo',
]

interface Props {
  degreeId: string
  selected: string[]
  onDocumentClick: (id: string) => void
}

type Subject = NonNullable<
  NonNullable<RouterOutputs['degree']['getDegree']>['subjects']
>[0]

export default function SubjectsFilter({
  degreeId,
  selected,
  onDocumentClick,
}: Props): JSX.Element {
  const { data: degree } = trpc.degree.getDegree.useQuery({
    degree: degreeId,
  })

  const parsedSubjects = useMemo(
    () =>
      degree?.subjects?.reduce<Record<number, Subject[]>>(
        (acumulador, subject) => {
          const year = subject.year

          if (acumulador[year] == null) {
            acumulador[year] = []
          }

          acumulador[year].push(subject)

          return acumulador
        },
        {}
      ) ?? {},
    [degree]
  )

  return (
    <Accordion.Root type="single" defaultValue="1" collapsible>
      {Object.keys(parsedSubjects).map(year => {
        const subjects = parsedSubjects[Number(year)]

        return (
          <Accordion.Item
            key={year}
            value={year}
            className={css({
              display: 'flex',
              flexDirection: 'column',
              gap: 'xs',
            })}
          >
            <Accordion.Header asChild>
              <Accordion.Trigger
                className={css({
                  borderRadius: 'md',
                  display: 'flex',
                  fontSize: 'sm',
                  gap: 'sm',
                  alignItems: 'center',
                  color: 'grey.500',

                  '&[data-state="open"] > svg': {
                    transform: 'rotate(0)',
                  },

                  _focus: {
                    outline: '3px solid token(colors.primary.200)',
                  },
                })}
              >
                <LiaAngleDownSolid
                  className={css({
                    fill: 'grey.500',
                    transform: 'rotate(-90deg)',
                    strokeWidth: 1.5,
                    transition:
                      'transform 300ms cubic-bezier(0.87, 0, 0.13, 1)',
                  })}
                  size={10}
                />
                {YEAR_NAMES[Number(year)]}
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content
              className={css({
                overflow: 'hidden',

                '&[data-state="open"]': {
                  animation: 'slideDown 300ms cubic-bezier(0.87, 0, 0.13, 1);',
                },

                '&[data-state="closed"]': {
                  animation: 'slideUp 300ms cubic-bezier(0.87, 0, 0.13, 1);',
                },
              })}
            >
              <div
                className={css({
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '2xs',
                  my: '3px',
                })}
              >
                {subjects.map(subject => (
                  <FilterItem
                    key={subject.id}
                    title={`${subject.name} ${
                      subject.code != null ? `(${subject.code})` : ''
                    }`}
                    Icon={LuBookMarked}
                    selected={selected.includes(subject.id)}
                    onClick={() => {
                      onDocumentClick(subject.id)
                    }}
                  />
                ))}
              </div>
            </Accordion.Content>
          </Accordion.Item>
        )
      })}
    </Accordion.Root>
  )
}
