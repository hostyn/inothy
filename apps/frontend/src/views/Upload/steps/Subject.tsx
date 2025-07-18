import { css } from '@styled-system/css'
import TabContent from '../TabContent'
import type { StepProps, UploadData } from '../types'
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

  const { data: subjects, isLoading } = trpc.degree.getSubjects.useQuery(
    {
      degree: universitySelected.degree,
    },
    {
      onError: () => {
        toastError(
          'Ha ocurrido un error inesperado, ¿tienes conexión a internet?'
        )
      },
    }
  )

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault()
    setData((data: UploadData) => ({
      ...data,
      subject: universitySelected.subject,
    }))
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
          gap: 'md',
          width: '100%',
          maxH: 'inherit',

          md: {
            gap: 'xl',
          },
        })}
      >
        <h1
          className={css({
            fontFamily: 'nunitoSans',
            fontSize: '2xl',
            color: 'text',
            fontWeight: '700',
            lineHeight: '1.2',
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
            height: '100%',
            width: '100%',
            overflowY: 'scroll',
            display: 'flex',
            flexDir: 'column',
            alignItems: 'center',
            justifyContent: isLoading ? 'center' : 'flex-start',
            gap: 'sm',
            padding: '3px',
            mb: 'sm',
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
              .sort((curr, prev) =>
                curr.subject.code > prev.subject.code ? 1 : -1
              )
              .map(subject => (
                <button
                  key={subject.id}
                  value={subject.subject.id}
                  title={`${subject.subject.name} ${
                    subject.subject.code != null
                      ? ` (${subject.subject.code})`
                      : ''
                  }`}
                  className={`${subjectCardStyles} ${
                    subject.subject.id === universitySelected.subject
                      ? subjectCardSelectedStyles
                      : ''
                  }`}
                  type="button"
                  onClick={() => {
                    setUniversitySelected(data => ({
                      ...data,
                      subject: subject.subject.id,
                    }))
                  }}
                >
                  <PiBookBookmarkLight
                    size={32}
                    className={css({
                      fill: 'text',
                    })}
                  />
                  <span
                    className={css({
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                    })}
                  >
                    {subject.subject.name}
                    {subject.subject.code != null &&
                      ` (${subject.subject.code})`}
                  </span>

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
  maxW: '100%',
  border: '1px solid token(colors.grey.100)',
  borderRadius: 'md',
  alignItems: 'center',
  gap: 'sm',
  padding: 'xs',
  textAlign: 'left',
  transition: 'outline-width 50ms ease-in-out, outline-offset 50ms ease-in-out',

  _focus: {
    outline: '3px solid token(colors.primary.300)',
    outlineOffset: '0',
  },
})

const subjectCardSelectedStyles = css({
  outline: '2px solid token(colors.primary.300)',
  outlineOffset: '-1px',
  gridTemplateColumns: 'auto 1fr auto',
})
