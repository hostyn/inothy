import { css } from '@styled-system/css'
import TabContent from '../TabContent'
import type { StepProps } from '../types'
import { trpc } from '@services/trpc'
import {
  AssignmentIcon,
  ExamIcon,
  ExerciseIcon,
  NoteIcon,
  OtherIcon,
  PracticeIcon,
  PresentationIcon,
  SummaryIcon,
} from '../icons/Icons'

export const DOCUMENT_TYPES: Record<
  string,
  { name: string; description: string; icon: () => JSX.Element }
> = {
  exam: {
    name: 'Examen',
    description: 'Un examen de la asignatura.',
    icon: ExamIcon,
  },
  note: {
    name: 'Apuntes',
    description: 'Unos apuntes tomados en clase.',
    icon: NoteIcon,
  },
  practice: {
    name: 'Práctica',
    description: 'Una práctica obligatoria o optativa que mandó el profesor.',
    icon: PracticeIcon,
  },
  assignment: {
    name: 'Trabajo',
    description: 'Un trabajo que realizaste para esa asignatura.',
    icon: AssignmentIcon,
  },
  exercise: {
    name: 'Ejercicio',
    description: 'Unos ejercicios de la asignatura resueltos.',
    icon: ExerciseIcon,
  },
  summary: {
    name: 'Resumen',
    description: 'Un resumen de un tema o de la asignatura completa.',
    icon: SummaryIcon,
  },
  presentation: {
    name: 'Presentación',
    description: 'Las diapositivas de una presentación.',
    icon: PresentationIcon,
  },
  other: {
    name: 'Otro',
    description: '¿Ninguna otra categoría se ajusta a lo que quieres subir?',
    icon: OtherIcon,
  },
}

export default function DocumentType({
  next,
  setData,
  ...props
}: StepProps): JSX.Element {
  const { data: documentTypes } = trpc.document.getDocumentTypes.useQuery()

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault()
    next()
  }

  return (
    <TabContent onSubmit={handleSubmit} {...props}>
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
          ¿Qué tipo de documento es?
        </h1>

        <div
          className={css({
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 'md',
            height: '3xl',
            width: '100%',
            overflowY: 'scroll',
          })}
        >
          {documentTypes?.map(documentType => {
            const Icon = DOCUMENT_TYPES[documentType.name].icon
            return (
              <button
                key={documentType.id}
                type="button"
                className={documentTypeCardStyles}
              >
                <span
                  className={css({
                    display: 'flex',
                    flexDirection: 'column',
                    color: 'grey.500',
                    textAlign: 'left',
                    gap: 'sm',
                  })}
                >
                  <span
                    className={css({
                      lineHeight: '100%',
                      fontWeight: '700',
                      color: 'text',
                    })}
                  >
                    {DOCUMENT_TYPES[documentType.name].name}
                  </span>
                  <span
                    className={css({
                      lineHeight: '100%',
                      fontSize: 'sm',
                    })}
                  >
                    {DOCUMENT_TYPES[documentType.name].description}
                  </span>
                </span>
                <Icon />
              </button>
            )
          })}
        </div>
      </div>
    </TabContent>
  )
}

const documentTypeCardStyles = css({
  display: 'grid',
  gridTemplateColumns: '1fr 32px',
  alignItems: 'center',
  border: '1px solid token(colors.grey.100)',
  width: '3xl',
  py: 'md',
  px: 'lg',
  borderRadius: 'md',
})
