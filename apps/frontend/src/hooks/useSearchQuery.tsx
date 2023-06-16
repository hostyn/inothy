import { type ChangeEvent, useState } from 'react'

interface ReturnType {
  searchQuery: string
  handleQueryChange: ({ target }: ChangeEvent<HTMLInputElement>) => void
}

export default function useSearchQuery(): ReturnType {
  const [searchQuery, setSearchQuery] = useState('')

  const handleQueryChange = ({
    target,
  }: ChangeEvent<HTMLInputElement>): void => {
    setSearchQuery(target.value)
  }

  return { searchQuery, handleQueryChange }
}
