interface CompleteProfileData {
  step: 'complete-profile'
  name: string
  lastName: string
  email: string
  birthDate: string
  nationality: string
  countryOfResidency: string
}

interface UploadDocumentData {
  step: 'upload-document'
  file: File
  subject?: string
}

export type UploadData = null | CompleteProfileData | UploadDocumentData

export interface StepProps {
  next: () => void
  prev: () => void
  value: string
  title: string
  data: UploadData
  setData: Dispatch<SetStateAction<UploadData>>
  steps: Step[]
}

export interface Step {
  number: number
  title: string
  steps: Array<({ ...props }: StepProps) => JSX.Element>
}
