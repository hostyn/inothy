interface RecordBase {
  objectID: string
  name: string
  logoUrl: string
}

export interface UniversityRecord extends RecordBase {
  type: 'university'
  symbol: string
  url: string
}

export interface SchoolRecord extends RecordBase {
  type: 'school'
  universityName: string
}

export interface DegreeRecord extends RecordBase{
  type: 'degree'
  universityName: string
  schoolName: string
}

export interface SubjectRecord extends RecordBase{
  type: 'subject'
  code: string
  universityName: string
}

export type Record = UniversityRecord | SchoolRecord | DegreeRecord | SubjectRecord

export interface SearchResults {
  hits: Record[]
  hitsPerPage: number
  length: number
  nbHits: number
  nbPages: number
  page: number
  query: string
}