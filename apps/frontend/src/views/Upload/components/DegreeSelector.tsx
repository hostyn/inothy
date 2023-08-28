import { trpc } from '@services/trpc'
import { css } from '@styled-system/css'
import { useState } from 'react'

interface UniversitySelected {
  university: string
  school: string
  degree: string
}

interface DegreeSelectorProps {
  initialValues: UniversitySelected
  onChange: (values: UniversitySelected) => void
}

export default function DegreeSelector({
  initialValues,
  onChange,
}: DegreeSelectorProps): JSX.Element {
  const { data: universities } = trpc.universities.getUniversities.useQuery()
  const [universitySelected, setUniversitySelected] =
    useState<UniversitySelected>(initialValues)

  const getNewUniversitySelectedValues = (
    universitySelected: string,
    schoolSelected?: string,
    degreeSelected?: string
  ): UniversitySelected => {
    const schoolParsed =
      schoolSelected ??
      universities?.find(university => university.id === universitySelected)
        ?.schools?.[0].id ??
      ''
    return {
      university: universitySelected,
      school: schoolParsed,
      degree:
        degreeSelected ??
        universities
          ?.find(university => university.id === universitySelected)
          ?.schools?.find(school => school.id === schoolParsed)?.degrees?.[0]
          .id ??
        '',
    }
  }

  const handleUniversityChange: React.ChangeEventHandler<HTMLSelectElement> = ({
    target,
  }) => {
    if (target.name === 'university') {
      const newValues = getNewUniversitySelectedValues(target.value)
      setUniversitySelected(newValues)
      onChange(newValues)
    }

    if (target.name === 'school') {
      const newValues = getNewUniversitySelectedValues(
        universitySelected.university,
        target.value
      )
      setUniversitySelected(newValues)
      onChange(newValues)
    }

    if (target.name === 'degree') {
      const newValues = getNewUniversitySelectedValues(
        universitySelected.university,
        universitySelected.school,
        target.value
      )
      setUniversitySelected(newValues)
      onChange(newValues)
    }
  }

  return (
    <div
      className={css({
        width: '100%',
        maxWidth: '100%',
        display: 'flex',
        justifyContent: 'space-evenly',
        gap: 'md',
      })}
    >
      <select
        name="university"
        value={universitySelected.university}
        onChange={handleUniversityChange}
        className={selectStyles}
      >
        {universities?.map(university => (
          <option key={university.id} value={university.id}>
            {university.name}
          </option>
        ))}
      </select>

      <select
        name="school"
        value={universitySelected.school}
        onChange={handleUniversityChange}
        className={selectStyles}
      >
        {universities
          ?.find(univeristy => univeristy.id === universitySelected.university)
          ?.schools.map(school => (
            <option key={school.id} value={school.id}>
              {school.name}
            </option>
          ))}
      </select>

      <select
        name="degree"
        value={universitySelected.degree}
        onChange={handleUniversityChange}
        className={selectStyles}
      >
        {universities
          ?.find(univeristy => univeristy.id === universitySelected.university)
          ?.schools.find(school => school.id === universitySelected.school)
          ?.degrees.map(degree => (
            <option key={degree.id} value={degree.id}>
              {degree.name}
            </option>
          ))}
      </select>
    </div>
  )
}

const selectStyles = css({
  color: 'primary.500',
  bg: 'grey.100',
  borderRadius: 'md',
  paddingLeft: 'sm',
  paddingRight: 'xl',
  height: '6xs',
  width: '100%',
  transition: 'background 150ms ease, outline-width 50ms ease-in-out',

  _focus: {
    bg: 'white',
    outline: '3px solid token(colors.primary.300)',
  },
})
