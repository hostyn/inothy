import Input from '@ui/Input'
import { css } from '@styled-system/css'
import SectionLayout from '../layouts/SectionLayout'
import { MdOutlineEmail } from 'react-icons/md'

export default function EmailSection(): JSX.Element {
  return (
    <SectionLayout
      title="Correo electrónico"
      description="Introduce tu nuevo email."
      bottomText="Deberás verificar tu nuevo correo electrónico."
      buttonText="Cambiar email"
    >
      <Input
        placeholder="Email"
        Icon={MdOutlineEmail}
        className={css({ width: 'xl', mt: '6px' })}
      />
    </SectionLayout>
  )
}
