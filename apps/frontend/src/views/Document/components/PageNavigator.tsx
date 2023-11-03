import { css } from '@styled-system/css'

interface PageNavigatorProps {
  numPages: number
  pageNumber: number
  setPageNumber: (prevPageNumber: (prevPageNumber: number) => number) => void
}

const PageNavigator = ({
  numPages,
  pageNumber,
  setPageNumber,
}: PageNavigatorProps): JSX.Element => {
  const changePage = (offset: number): void => {
    setPageNumber(prevPageNumber => prevPageNumber + offset)
  }

  const previousPage = (): void => {
    changePage(-1)
  }
  const nextPage = (): void => {
    changePage(1)
  }

  return (
    <div
      className={css({
        position: 'absolute',
        backgroundColor: 'token(colors.grey.100)',
        bottom: '9xl',
        right: '40%',
        rounded: 'md',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 'sm',
        gap: 'sm',
        fontSize: 'sm',
      })}
    >
      <button type="button" disabled={pageNumber <= 1} onClick={previousPage}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M15 18L9 12L15 6"
            stroke="#0F1C2D"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <p
        className={css({
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          rounded: 'md',
          width: '6xs',
          height: '7xs',
          backgroundColor: 'token(colors.grey.200)',
        })}
      >
        {pageNumber}
      </p>
      <p>/</p>
      <p>{numPages}</p>
      <button
        type="button"
        disabled={pageNumber >= numPages}
        onClick={nextPage}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M9 6L15 12L9 18"
            stroke="#0F1C2D"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  )
}

export default PageNavigator
