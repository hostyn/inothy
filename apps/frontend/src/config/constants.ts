import {
  type IconProps,
  AssignmentIcon,
  ExamIcon,
  ExerciseIcon,
  NoteIcon,
  OtherIcon,
  PracticeIcon,
  PresentationIcon,
  SummaryIcon,
} from '@components/icons'
import type { CountryISO } from 'mangopay2-nodejs-sdk'

export const BADGE_NAMES = {
  ambassador: 'Embajador',
  bronze: 'Bronze',
  silver: 'Plata',
  gold: 'Oro',
}

export const REFUSE_REASONS = {
  DOCUMENT_UNREADABLE:
    'El documento ha sido rechazado porque no se puede leer.',
  DOCUMENT_NOT_ACCEPTED:
    'El documento ha sido rechazado porque no se acepta ese tipo de documento.',
  DOCUMENT_HAS_EXPIRED:
    'El documento ha sido rechazado porque estaba expirado.',
  DOCUMENT_INCOMPLETE:
    'El documento ha sido rechazado porque estaba incompleto.',
  DOCUMENT_MISSING:
    'El documento ha sido rechazado porque no aparecia en los archivos enviados.',
  DOCUMENT_DO_NOT_MATCH_USER_DATA:
    'El documento ha sido rechazado porque la información no concuerda con la del usuario.',
  DOCUMENT_DO_NOT_MATCH_ACCOUNT_DATA:
    'El documento ha sido rechazado porque la información no concuerda con la del usuario.',
  DOCUMENT_FALSIFIED:
    'El documento ha sido rechazado porque se sospecha que ha sido falsificado.',
  UNDERAGE_PERSON:
    'El documento ha sido rechazado porque es necesario ser mayor de edad.',
  SPECIFIC_CASE: 'El documento ha sido rechazado por un caso específico.',
}

export const DOCUMENT_TYPES: Record<string, string> = {
  exam: 'Exámen',
  note: 'Apuntes',
  practice: 'Práctica',
  assignment: 'Tarea',
  exercise: 'Ejercicio',
  summary: 'Resumen',
  presentation: 'Presentación',
  other: 'Otro',
}

export const DOCUMENT_TYPES_WITH_ICON: Record<
  string,
  { name: string; description: string; icon: (props: IconProps) => JSX.Element }
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

export const EEA_COUNTRIES: CountryISO[] = [
  'AT',
  'BE',
  'BG',
  'HR',
  'CY',
  'CZ',
  'DK',
  'EE',
  'FI',
  'FR',
  'DE',
  'GR',
  'HU',
  'IS',
  'IE',
  'IT',
  'LV',
  'LI',
  'LT',
  'LU',
  'MT',
  'NL',
  'NO',
  'PL',
  'PT',
  'RO',
  'SK',
  'SI',
  'ES',
  'SE',
]

export const NATIONAL_ID_ACCEPTED_COUNTRIES: CountryISO[] = [
  ...EEA_COUNTRIES,
  'US',
  'CA',
  'AU',
]
