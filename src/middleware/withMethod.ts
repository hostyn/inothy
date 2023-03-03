import type { NextApiRequest, NextApiResponse } from 'next'

export default function withMethod(
  method: string,
  handler: (req: NextApiRequest, res: NextApiResponse) => any
) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== method) {
      res.status(405).json({ success: false, error: 'method-not-allowed' })
      return
    }
    handler(req, res)
  }
}
