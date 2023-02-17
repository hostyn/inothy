import mangopay from '../../config/mangopay'

export default async function createcardregistration (req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  const body = JSON.parse(req.body)

  try {
    const cardRegistrationResponse = await mangopay.CardRegistrations.update({
      Id: body.id,
      RegistrationData: body.registrationData
    })

    if (cardRegistrationResponse.Status === 'ERROR') {
      res.status(400).json({ error: 'Error' })
      return
    }

    res.status(200).json({ status: 'success' })
    return
  } catch (e) {
    console.log(e)
    res.status(500).json({ error: 'Internal server error' })
  }
}
