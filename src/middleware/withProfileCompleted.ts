import type { NextApiRequest, NextApiResponse } from 'next'
import type { ApiUser } from 'types/api'
import withAuthFullData from './withAuthFullData'

export default function withProfileCompleted(
  handler: (user: ApiUser, req: NextApiRequest, res: NextApiResponse) => any
): (req: NextApiRequest, res: NextApiResponse) => Promise<void> {
  return withAuthFullData(
    async (user: ApiUser, req: NextApiRequest, res: NextApiResponse) => {
      if (!user.data.profileCompleted) {
        res.status(401).json({ success: false, error: 'incompleted-profile' })
        return
      }
      await handler(user, req, res)
    }
  )
}
