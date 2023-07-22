import Input from '@ui/Input'
import { css } from '@styled-system/css'
import SectionLayout from '../layouts/SectionLayout'
import { AiOutlineUser } from 'react-icons/ai'

export default function UsernameSection(): JSX.Element {
  return (
    <SectionLayout
      title="Nombre de usuario"
      description="Puedes cambiar tu nombre de usuario una vez cada 6 meses."
      bottomText="Usa un máximo de 48 caracteres."
      buttonText="Cambiar nombre"
    >
      <Input
        placeholder="Nombre"
        Icon={AiOutlineUser}
        className={css({ width: 'xl', mt: '6px' })}
      />
    </SectionLayout>
  )
}
