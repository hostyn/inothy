import { css } from '@styled-system/css'
import TabContent from '../TabContent'
import type { StepProps } from '../types'
import { trpc } from '@services/trpc'
import { useState } from 'react'
import { PiBookBookmarkLight } from 'react-icons/pi'
import { BsCheck2 } from 'react-icons/bs'
import Spinner from '@components/Spinner'
import { toastError } from '@services/toaster'
import DegreeSelector from '../components/DegreeSelector'

interface UniversitySelected {
  university: string
  school: string
  degree: string
  subject?: string
}

export default function Subject({
  next,
  setData,
  ...props
}: StepProps): JSX.Element {
  const { data: universities } = trpc.universities.getUniversities.useQuery()
  const [universitySelected, setUniversitySelected] =
    useState<UniversitySelected>({
      university: universities?.[0].id ?? '',
      school: universities?.[0].schools?.[0].id ?? '',
      degree: universities?.[0].schools?.[0].degrees?.[0].id ?? '',
    })

  const { data: subjects, isLoading } = trpc.universities.getSubjects.useQuery(
    {
      degree: universitySelected.degree,
    },
    {
      onError: _error => {
        toastError(
          'Ha ocurrido un error inesperado, ¿tienes conexión a internet?'
        )
      },
    }
  )

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault()
    next()
  }

  return (
    <TabContent
      onSubmit={handleSubmit}
      disabled={universitySelected.subject == null}
      {...props}
    >
      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 'xl',
          width: '100%',
        })}
      >
        <h1
          className={css({
            fontSize: '2xl',
            color: 'text',
            fontWeight: '700',
          })}
        >
          ¿De qué asignatura son?
        </h1>

        <DegreeSelector
          initialValues={{
            university: universitySelected.university,
            school: universitySelected.school,
            degree: universitySelected.degree,
          }}
          onChange={setUniversitySelected}
        />

        <div
          className={css({
            height: '3xl',
            width: '100%',
            overflowY: 'scroll',
            display: 'flex',
            flexDir: 'column',
            alignItems: 'center',
            justifyContent: isLoading ? 'center' : 'flex-start',
            gap: 'sm',
            padding: '3px',
          })}
        >
          {isLoading ? (
            <Spinner
              className={css({
                fontSize: '2xl',
                stroke: 'grey.300',
              })}
            />
          ) : (
            subjects
              ?.sort((curr, prev) =>
                curr.subject.name > prev.subject.name ? -1 : 1
              )
              .sort((curr, prev) => (curr.year > prev.year ? 1 : -1))
              .map(subject => (
                <button
                  key={subject.id}
                  value={subject.id}
                  className={`${subjectCardStyles} ${
                    subject.id === universitySelected.subject
                      ? subjectCardSelectedStyles
                      : ''
                  }`}
                  type="button"
                  onClick={() => {
                    setUniversitySelected(data => ({
                      ...data,
                      subject: subject.id,
                    }))
                  }}
                >
                  <PiBookBookmarkLight
                    size={32}
                    className={css({
                      fill: 'text',
                    })}
                  />
                  {subject.subject.name}
                  {subject.subject.code != null && ` (${subject.subject.code})`}

                  {subject.id === universitySelected.subject && (
                    <BsCheck2
                      size={24}
                      className={css({
                        fill: 'primary.300',
                      })}
                    />
                  )}
                </button>
              ))
          )}
        </div>
      </div>
    </TabContent>
  )
}

const subjectCardStyles = css({
  display: 'grid',
  gridTemplateColumns: 'auto 1fr',
  color: 'text',
  width: '3xl',
  border: '1px solid token(colors.grey.100)',
  borderRadius: 'md',
  alignItems: 'center',
  gap: 'sm',
  padding: 'xs',
  textAlign: 'left',

  _focus: {
    bg: 'white',
    outline: '3px solid token(colors.primary.300)',
  },
})

const subjectCardSelectedStyles = css({
  border: '1px solid token(colors.primary.300)',
  outline: '1px solid token(colors.primary.300)',
  gridTemplateColumns: 'auto 1fr auto',
})
