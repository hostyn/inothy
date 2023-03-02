import Link from 'next/link'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import A from '@ui/A'
import Menu from '../../components/Account/Menu'
import App from '../../components/App'
import Button from '@ui/Button'
import Img from '@ui/Img'
import Input from '@ui/Input'
import Text from '@ui/Text'
import { colors } from '../../config/theme'
import { useAuth } from '../../context/authContext'
import { useModal } from '../../context/modalContext'
import { getBalance, getBankAccount, updateBankAccount } from '../../util/api'
import { currencyFormatter } from '../../util/normailize'
import WithdrawModal from './components/WithdrawModal'

const BalanceDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 0 0 2rem;

  @media (max-width: 1000px) {
    padding: 0;
  }
`

const BalanceGrid = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: auto auto 5.5rem;

  @media (max-width: 1200px) {
    grid-template-columns: auto auto 4.5rem;
  }

  @media (max-width: 500px) {
    grid-template-columns: 1fr 6rem;
  }
`

const BalanceTitle = styled(Text)`
  @media (max-width: 1200px) {
    font-size: 2rem;
  }
`

const BalanceText = styled(Text)`
  @media (max-width: 1200px) {
    font-size: 3rem;
    margin: 0;
  }

  @media (max-width: 500px) {
    text-align: left;
  }
`

const BalanceImg = styled(Img)`
  @media (max-width: 1200px) {
    height: 3rem;
    width: 4.5rem;
  }

  @media (max-width: 500px) {
    height: 6rem;
    width: 6rem;
    grid-column: 2;
    grid-row: 1 / 3;
  }
`

const BankAccountDiv = styled.div`
  display: flex;
  flex-direction: column;
  border: 3px solid ${colors.primary};
  border-radius: 20px;
  padding: 2rem;
  margin: 1rem 0 0 0;
`

const ButtonsDiv = styled.div`
  margin: 1rem 0 0 0;
  width: 100%;
  display: flex;
  flex-direction: row-reverse;
  gap: 1rem;
`

const MessageDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
`

const Title = styled(Text)`
  @media (max-width: 1200px) {
    font-size: 1.5rem;
  }
`

const BodyText = styled(Text)`
  @media (max-width: 1200px) {
    font-size: 1rem;
  }
`

const StyledButton = styled(Button)`
  @media (max-width: 500px) {
    font-size: 1rem;
  }
`

const refuseReasons = {
  DOCUMENT_UNREADABLE:
    'El documento ha sido rechazado porque no se puede leer.',
  DOCUMENT_NOT_ACCEPTED:
    'El documento ha sido rechazado porque no se acepta ese tipo de documento.',
  DOCUMENT_HAS_EXPIRED:
    'El documento ha sido rechazado porque estaba expirado.',
  DOCUMENT_INCOMPLETE:
    'El documento ha sido rechazado porque estaba incompleto.',
  DOCUMENT_MISSING:
    'El documento ha sido rechazado porque no aparecia en los archivos enviados.',
  DOCUMENT_DO_NOT_MATCH_USER_DATA:
    'El documento ha sido rechazado porque la información no concuerda con la del usuario.',
  DOCUMENT_DO_NOT_MATCH_ACCOUNT_DATA:
    'El documento ha sido rechazado porque la información no concuerda con la del usuario.',
  DOCUMENT_FALSIFIED:
    'El documento ha sido rechazado porque se sospecha que ha sido falsificado.',
  UNDERAGE_PERSON:
    'El documento ha sido rechazado porque es necesario ser mayor de edad.',
  SPECIFIC_CASE: 'El documento ha sido rechazado por un caso específico.'
}

export default function BalanceView () {
  const { user } = useAuth()
  const { openModal, closeModal } = useModal()

  const [balance, setBalance] = useState(null)
  const [formIban, setFormIban] = useState('')
  const [bankAccount, setBankAccount] = useState(null)
  const [edit, setEdit] = useState(false)

  const handleChange = ({ target }) => {
    if (target.value === '') {
      setFormIban('')
      return
    }

    const iban = target.value.replaceAll(' ', '')
    if (iban.match(/((^[A-Z]{2})|(^[A-Z]$))\d{0,30}$/)) {
      setFormIban(target.value)
    }
  }

  const handleBankAccountUpdate = async () => {
    const iban = formIban.replaceAll(' ', '')
    try {
      await updateBankAccount(user, iban)
    } catch {
      openModal(
        <MessageDiv>
          <Title
            fontSize="3rem"
            color="secondary"
            fontWeight="bold"
            textAlign="center"
          >
            DATOS BANCARIOS ERRONEOS
          </Title>
          <BodyText fontSize="2rem" textAlign="center">
            No hemos podido añadir la cuenta bancaria, revisa la información.
          </BodyText>
        </MessageDiv>
      )

      await new Promise((resolve) => setTimeout(resolve, 2000))
      closeModal()

      return
    }

    const bankAccount = await getBankAccount(user)

    if (bankAccount !== null) {
      setBankAccount(bankAccount)
      setFormIban(bankAccount.IBAN)
    } else {
      setBankAccount(null)
    }
    setEdit(false)
  }

  const openWithdrawModal = async () => {
    openModal(<WithdrawModal balance={balance} bank={bankAccount} />)
  }

  useEffect(() => {
    getBalance(user).then((balance) => setBalance(balance))
    getBankAccount(user).then((res) => {
      if (res !== null) {
        setBankAccount(res)
        setFormIban(res.IBAN)
      } else {
        setBankAccount(null)
      }
    })
  }, [user])

  return (
    <App>
      <Menu balance>
        <BalanceDiv>
          <BalanceGrid>
            <BalanceTitle
              fontSize="3rem"
              fontWeight="bold"
              fontFamily="HelveticaRounded"
              color="secondary"
            >
              Balance
            </BalanceTitle>
            {balance !== null
              ? (
              <BalanceText
                fontSize="4rem"
                fontFamily="HelveticaRounded"
                textAlign="right"
                margin="0 1rem 0 0"
              >
                {currencyFormatter.format(balance)}
              </BalanceText>
                )
              : (
              <BalanceText
                fontSize="4rem"
                fontFamily="HelveticaRounded"
                textAlign="right"
                margin="0 1rem 0 0"
              >
                - €
              </BalanceText>
                )}
            <BalanceImg
              src="/icons/pig.svg"
              height="4rem"
              width="5.5rem"
              aspectRatio="199/150"
            />
          </BalanceGrid>
          {user.data.mangopayKYCStatus === 'VALIDATED'
            ? (
            <BankAccountDiv>
              <Text fontSize="1.5rem" color="secondary" fontWeight="bold">
                Cuenta bancaria
              </Text>
              <Text margin="1rem 0 0 0">Nombre y Apellidos</Text>

              <Input
                value={user.data.name + ' ' + user.data.surname}
                disabled
              />
              <Text margin="1rem 0 0 0">IBAN</Text>
              <Input
                placeholder="ES00 0000 0000 0000 0000 0000"
                value={formIban}
                disabled={bankAccount !== null && !edit}
                onChange={handleChange}
              />
              <ButtonsDiv>
                {bankAccount !== null
                  ? (
                      edit
                        ? (
                    <>
                      <StyledButton
                        padding="0.5rem 1rem"
                        margin="0"
                        onClick={handleBankAccountUpdate}
                      >
                        Actualizar
                      </StyledButton>
                      <StyledButton
                        padding="0.5rem 1rem"
                        margin="0"
                        background="secondary"
                        onClick={() => {
                          setFormIban(bankAccount.IBAN)
                          setEdit(false)
                        }}
                      >
                        Cancelar
                      </StyledButton>
                    </>
                          )
                        : (
                    <>
                      <StyledButton
                        padding="0.5rem 1rem"
                        margin="0"
                        background="secondary"
                        disabled={!balance}
                        onClick={openWithdrawModal}
                      >
                        Retirar
                      </StyledButton>
                      <StyledButton
                        padding="0.5rem 1rem"
                        margin="0"
                        onClick={() => setEdit(true)}
                      >
                        Editar
                      </StyledButton>
                    </>
                          )
                    )
                  : (
                  <StyledButton
                    padding="0.5rem 1rem"
                    margin="0"
                    onClick={handleBankAccountUpdate}
                  >
                    Añadir
                  </StyledButton>
                    )}
              </ButtonsDiv>
            </BankAccountDiv>
              )
            : (
            <BankAccountDiv>
              <Title fontSize="2rem" fontWeight="bold" color="secondary">
                Verifica tu identidad
              </Title>
              <Text margin="0.5rem 0 0 0">
                Para que puedas retirar tu dinero necesitamos que verifiques tu
                identidad.{' '}
                <Link href="/info" passHref>
                  <A fontSize="1rem" fontWeight="normal">
                    Mas información.
                  </A>
                </Link>
              </Text>
              {user.data.mangopayKYCStatus === 'VALIDATION_ASKED'
                ? (
                <>
                  <Text
                    fontSize="1.5rem"
                    color="secondary"
                    margin="2rem 0 0 0"
                    fontWeight="bold"
                  >
                    Verificación pendiente
                  </Text>
                  <Text>
                    Ya has enviado tu información y la estamos revisando, en
                    breve podrás retirar tu saldo.
                  </Text>
                </>
                  )
                : (
                <>
                  {user.data.mangopayKYCStatus === 'REFUSED' && (
                    <>
                      <Text
                        fontSize="1.5rem"
                        color="secondary"
                        margin="2rem 0 0 0"
                        fontWeight="bold"
                      >
                        Tus documentos han sido rechazados
                      </Text>
                      <Text margin="1rem 0 0 0">
                        {refuseReasons[user.data.mangopayKYCRefusedReasonType]}
                      </Text>
                      <Text margin="1rem 0 0 0">
                        Por favor ten en cuenta el motivo del rechazo y lee los
                        requisitos antes de volver a solicitar una verificación.
                      </Text>
                    </>
                  )}
                  {user.data.mangopayKYCStatus === 'OUT_OF_DATE' && (
                    <>
                      <Text
                        fontSize="1.5rem"
                        color="secondary"
                        margin="2rem 0 0 0"
                        fontWeight="bold"
                      >
                        Tus documentos han caducado
                      </Text>
                      <Text margin="1rem 0 0 0">
                        Necesitamos que vuelvas a verificar tu identidad antes
                        de retirar.
                      </Text>
                    </>
                  )}
                  <Link href="/kyc" passHref>
                    <Button margin="1rem auto 0 auto" padding="0.5rem 1rem">
                      Verificar
                    </Button>
                  </Link>
                </>
                  )}
            </BankAccountDiv>
              )}
        </BalanceDiv>
      </Menu>
    </App>
  )
}
