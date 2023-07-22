import Input from '@ui/Input'
import { css } from '@styled-system/css'
import SectionLayout from '../layouts/SectionLayout'

export default function DescriptionSection(): JSX.Element {
  return (
    <SectionLayout
      title="Descripción"
      description="Actualiza la descripción de tu perfil."
      bottomText="Muestale a la gente quién eres y porque deberían comprar tus apuntes."
      buttonText="Cambiar descripción"
    >
      <Input
        placeholder="Descripción"
        className={css({ width: 'xl', mt: '6px' })}
      />
    </SectionLayout>
  )
}
