import styled from 'styled-components'
import { colors } from '@config/theme'
import { v4 } from 'uuid'
import { forwardRef } from 'react'
import type { FieldError, ChangeHandler } from 'react-hook-form'
import Text from './Text'
import Flex from './Flex'
import Img from './Img'

interface LabelProps {
  error: boolean
  fontSize?: string
  border?: string
}

const Label = styled.label<LabelProps>`
  font-family: VarelaRound;
  font-size: ${props => props.fontSize ?? '1.3rem'};
  color: ${props => (props.error ? colors.secondary : colors.primary)};
  padding: 5px 1rem;
  margin: 0 0 5px 0;
  border-radius: 999999px;
  border: ${props =>
    props.error
      ? `2px solid ${colors.secondary}`
      : `2px solid ${colors.primary}`};
  width: fit-content;
  cursor: pointer;
  transition: 0.2s;

  :hover {
    scale: 1.05;
  }

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`

const Input = styled.input`
  display: none;
`

const ErrorDiv = styled.div<{ centered?: boolean }>`
  width: 100%;
  max-width: 100%;
  height: calc(0.8rem + 5px);
  display: flex;
  padding: 0 0 5px 0;
  justify-content: ${props => (props.centered ? 'center' : 'initial')};
`
const FileName = styled(Text)`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow-x: clip;
`

interface FileInputProps extends Omit<LabelProps, 'error'> {
  onChange?: ChangeHandler
  onBlur?: ChangeHandler
  placeholder?: string
  multiple?: boolean
  key?: string
  accept?: string
  name?: string
  error?: FieldError
  margin?: string
  file?: FileList
  maxWidth?: string
  centered?: boolean
}

function Fileinput(
  {
    margin,
    placeholder,
    border,
    error,
    file,
    maxWidth,
    centered,
    ...props
  }: FileInputProps,
  ref: React.Ref<any>
): JSX.Element {
  const id = v4()
  return (
    <Flex
      margin={margin}
      alignItems={centered ? 'center' : 'flex-start'}
      maxWidth={maxWidth}
    >
      <Label htmlFor={id} border={border} error={error != null}>
        {placeholder ?? 'Adjuntar archivo'}
      </Label>
      <Input id={id} type="file" ref={ref} {...props} />
      <ErrorDiv centered={centered}>
        {error != null ? (
          <>
            <Img
              src="/icons/info-error.svg"
              width="1rem"
              height="1rem"
              minWidth="1rem"
              minHeight="1rem"
              margin="0 5px"
            />
            <Text
              margin={centered ?? false ? '0' : '0 auto 0 0'}
              color="secondary"
              fontSize="0.8rem"
            >
              {error?.message?.toString()}
            </Text>
          </>
        ) : (
          file != null &&
          file.length > 0 && (
            <>
              <Img
                src="/icons/file.svg"
                width="1rem"
                height="1rem"
                minWidth="1rem"
                minHeight="1rem"
                margin="0 5px"
              />
              <FileName margin="0 auto 0 0" fontSize="0.8rem">
                {file[0].name}
              </FileName>
            </>
          )
        )}
      </ErrorDiv>
    </Flex>
  )
}

export default forwardRef(Fileinput)
