import styled from 'styled-components'
import Text from '../../../components/Text'

const HeaderTitle = styled(Text)`
  font-size: 3rem;
  font-weight: bold;
  font-family: "HelveticaRounded";
  text-align: center;

  @media (max-width: 768px) {
    font-size: 1.7rem;
  }
`

export default HeaderTitle
