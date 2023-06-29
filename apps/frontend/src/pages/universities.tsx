import Head from 'next/head'
import publicContentSSR from '@middleware/publicContentSSR'
import publicContent from '@middleware/publicContent'
import { trpc } from '@services/trpc'
import App from '@components/App'
import { css } from '@styled-system/css'
import { LiaUniversitySolid } from 'react-icons/lia'
import SearchBar from '@ui/SearchBar'
import Image from 'next/image'

function Universities(): JSX.Element {
  const { data: universities } = trpc.universities.getUniversities.useQuery()

  return (
    <>
      <Head>
        <title>Inothy - Universidades</title>
        <meta name="robots" content="index,follow" />
      </Head>
      <App>
        <div className={css({ width: '5xl', margin: 'auto' })}>
          <div
            className={css({
              py: 'md',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            })}
          >
            <div
              className={css({
                display: 'flex',
                alignItems: 'center',
                gap: 'sm',
              })}
            >
              <LiaUniversitySolid
                size={24}
                className={css({ fill: 'primary.500' })}
              />
              <h1 className={css({ fontSize: 'xl', color: 'primary.500' })}>
                Universidades
              </h1>
            </div>

            <SearchBar />
          </div>

          <div className={css({ height: '2px', bg: 'grey.100' })} />

          <div
            className={css({
              display: 'flex',
              flexDirection: 'column',
              py: 'md',
              gap: 'xs',
            })}
          >
            {universities?.map(university => (
              <div
                key={university.id}
                className={css({
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                })}
              >
                <div
                  className={css({
                    display: 'flex',
                    gap: 'sm',
                    alignItems: 'center',
                  })}
                >
                  <Image
                    src={university.logoUrl}
                    alt={`Logo de la ${university.name}`}
                    width={32}
                    height={32}
                    className={css({ borderRadius: 'mf' })}
                  />
                  <p
                    className={css({
                      fontSize: 'lg',
                      fontWeight: '600',
                      color: 'primary.500',
                    })}
                  >
                    {university.name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </App>
    </>
  )
}

export default publicContent(Universities)
export const getServerSideProps = publicContentSSR(async ({ helper }) => {
  await helper.universities.getUniversities.prefetch()
  return { props: {} }
})
