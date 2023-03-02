import Menu from '../../components/Account/Menu'
import App from '../../components/App'
import styled from 'styled-components'
import { colors, sizes } from '../../config/theme'
import Text from '@ui/Text'
import Img from '@ui/Img'
import Input from '@ui/Input'

const SettingsGrids = styled.div`
  height: ${sizes.accountHeight};
  display: grid;
  grid-template-columns: 55% 1fr;
  grid-template-rows: 55% 1fr;
  gap: 2rem;
`

const SettingsBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  border-radius: 20px;
  border: 3px solid ${colors.primary};
  padding: 3rem;

  grid-column: ${(props) => props.girdColumn || 'auto'};
  grid-row: ${(props) => props.gridRow || 'auto'};
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const InputDiv = styled.div`
  display: flex;
  flex-direction: column;
`

export default function SettingsView () {
  return (
    <App>
      <Menu settings>
        <SettingsGrids>
          <SettingsBox girdColumn="1" gridRow="1 / 3">
            <Header>
              <Text fontSize="3rem" color="secondary">
                Seguridad
              </Text>
              <Img
                src="/icons/settings.svg"
                aspectRatio="1"
                height="6rem"
                width="auto"
              />
            </Header>
            <InputDiv>
              <Text fontSize="1.5rem" margin="0 0 0.5rem 0">
                Correo electrónico
              </Text>
              <Input
                border={`2px solid ${colors.primary}`}
                borderRadius="10px"
                padding="10px"
                name="name"
                disabled
              />
            </InputDiv>
            <InputDiv>
              <Text fontSize="1.5rem" margin="0 0 0.5rem 0">
                Contraseña
              </Text>
              <Input
                border={`2px solid ${colors.primary}`}
                borderRadius="10px"
                padding="10px"
                name="name"
                disabled
              />
            </InputDiv>
          </SettingsBox>
          <SettingsBox>
            <h1>hola</h1>
          </SettingsBox>

          <SettingsBox>
            <h1>hola</h1>
          </SettingsBox>
        </SettingsGrids>
      </Menu>
    </App>
  )
}
