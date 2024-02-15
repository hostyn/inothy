export interface PersonalInfoStep {
  step: 'personal-info'
  name: string
  lastName: string
  email: string
  birthDate: string
  nationality: string
  countryOfResidence: string
}

export interface AddressStep extends PersonalInfoStep {
  step: 'address'
  address1: string
  address2: string
  country: string
  city: string
  region: string
  postalCode: string
}

export interface DocumentTypeStep extends AddressStep {
  step: 'document-type'
  documentType: 'id' | 'passport'
}

export type KYCData = null | PersonalInfoStep | AddressStep | DocumentTypeStep

export interface StepProps {
  next: () => void
  prev: () => void
  value: string
  title: string
  data: KYCData
  setData: Dispatch<SetStateAction<KYCData>>
  steps: Step[]
}

export interface Step {
  number: number
  title: string
  description: string
  Icon: () => JSX.Element
  steps: Array<({ ...props }: StepProps) => JSX.Element>
}
