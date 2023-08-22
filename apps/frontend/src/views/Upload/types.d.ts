interface CompleteProfileData {
  step: 'complete-profile'
  name: string
  lastName: string
  email: string
  birthDate: string
  nationality: string
  countryOfResidency: string
}

export type UploadData = null | CompleteProfileData

export interface StepProps {
  next: () => void
  prev: () => void
  value: string
  title: string
  data: UploadData
  setData: Dispatch<SetStateAction<UploadData>>
}
