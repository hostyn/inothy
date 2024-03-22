import type { NextApiRequest, NextApiResponse } from 'next'
import { unsetAuthCookies } from 'next-firebase-auth'
import initAuth from '../../config/initAuth'

initAuth()

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  try {
    await unsetAuthCookies(req, res)
  } catch (e) {
    res.status(500).json({ error: 'Unexpected error.' })
    return
  }
  res.status(200).json({ success: true })
}

export default handler
