import { cva } from '@styled-system/css'
import { styled } from '@styled-system/jsx'

const fieldSetStyles = cva({
  base: {
    display: 'flex',
    justifyContent: 'space-evenly',
    width: '100%',
    gap: 'md',
  },
})

const FieldSetElement = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}): JSX.Element => <fieldset className={className}>{children}</fieldset>

const FieldSet = styled(FieldSetElement, fieldSetStyles)

export default FieldSet
