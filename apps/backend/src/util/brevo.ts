// interface UserAttributes {
//   USERNAME?: string
//   LASTNAME?: string
//   FIRSTNAME?: string
//   SIGNUP_DATE?: string
//   SELLER?: boolean
//   BUYER?: boolean
//   PROFESSOR?: boolean
//   ACADEMY?: boolean
//   BIRTH_DATE?: string
// }

const constructRequest = async (
  resource: string,
  init?: RequestInit
): Promise<Response> => {
  return await fetch('https://api.brevo.com/v3' + resource, {
    ...init,
    headers: {
      accept: 'application/json',
      'api-key': process.env.BREVO_API_KEY ?? '',
      'content-type': 'application/json',
      ...init?.headers,
    },
  })
}

export const sendTemplateEmail = async (
  templateId: number,
  to: string,
  params: Record<string, string>
): Promise<void> => {
  const res = await constructRequest('/smtp/email', {
    method: 'POST',
    body: JSON.stringify({
      templateId,
      replyTo: {
        email: 'contact@inothy.com',
      },
      params,
      to: [
        {
          email: to,
        },
      ],
    }),
  })

  if (!res.ok) {
    throw new Error('Error sending email')
  }
}
