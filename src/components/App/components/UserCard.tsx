import Img from '@ui/Img'
import Text from '@ui/Text'
import { colors } from '@config/theme'
import { useAuth } from '@context/authContext'
import type { Dispatch, ForwardedRef, SetStateAction } from 'react'
import { forwardRef } from 'react'
import styled from 'styled-components'

const User = styled.div<{ hover: boolean }>`
  display: flex;
  min-height: 100%;
  max-height: 100%;
  min-width: 100%;
  max-width: 100%;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  margin: 0 auto;
  border-radius: 15px;
  padding: 0 1rem;
  transition: 0.2s;

  &:hover {
    background-color: ${colors.hover};
  }

  background-color: ${props =>
    props.hover ? colors.hover : colors.userEmphasis};

  @media (max-width: 768px) {
    display: none;
  }
`

const UsernameText = styled(Text)`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  width: 100%;
  text-align: center;
`

interface UserCardProps {
  showMenu: boolean
  setShowMenu: Dispatch<SetStateAction<boolean>>
}

function UserCard(
  { showMenu, setShowMenu }: UserCardProps,
  ref: ForwardedRef<HTMLDivElement>
): JSX.Element {
  const { user } = useAuth()

  return (
    <User
      ref={ref}
      hover={showMenu}
      onClick={() => {
        setShowMenu(state => !state)
      }}
    >
      <Img
        src="/resources/navbar/menu.svg"
        alt="Menú"
        aspectRatio="1"
        height="1.5rem"
        width="auto"
      />
      <UsernameText
        fontFamily="HelveticaRounded"
        fontWeight="bold"
        fontSize="1.5rem"
        margin="0 1rem 0 1rem"
        userSelect="none"
      >
        {user?.data.username}
      </UsernameText>
      <Img
        src="/icons/profile.svg"
        alt="Profile"
        aspectRatio="1"
        height="2.5rem"
        width="auto"
        cursor="pointer"
      />
    </User>
  )
}

export default forwardRef(UserCard)
