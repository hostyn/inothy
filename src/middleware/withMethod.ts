import type { NextApiRequest, NextApiResponse } from 'next'
import type { Method } from 'types/api'

export default function withMethod(
  method: Method,
  handler: (req: NextApiRequest, res: NextApiResponse) => any
) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== method) {
      res.status(405).json({ success: false, error: 'method-not-allowed' })
      return
    }
    await handler(req, res)
  }
}
