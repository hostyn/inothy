import { css } from '@styled-system/css'

interface UserReviewCardProps {
  userId: string
}

const UserReviewCard = ({ userId }: UserReviewCardProps): JSX.Element => {
  return (
    <section
      className={css({
        display: 'flex',
        p: 'md',
        backgroundColor: 'token(colors.grey.100)',
        w: '100%',
      })}
    >
      <div className={css({ position: 'relative' })}>IMAGEN</div>
      <div>
        <h2>TITULO DOC</h2>
        <div>
          <div>IMAGEN Y USUARIO</div>
          <div>ESTRELLAS Y FECHA</div>
          <div>DESCRIPCIÓN RESEÑA</div>
        </div>
      </div>
    </section>
  )
}
export default UserReviewCard
