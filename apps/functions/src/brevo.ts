interface UserAttributes {
  USERNAME?: string
  LASTNAME?: string
  FIRSTNAME?: string
  SIGNUP_DATE?: string
  SELLER?: boolean
  BUYER?: boolean
  PROFESSOR?: boolean
  ACADEMY?: boolean
  BIRTH_DATE?: string
}

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

export const createOrUpdateContact = async (
  email: string,
  attributes: UserAttributes
): Promise<{ id: number }> => {
  const createUserRes = await constructRequest('/contacts', {
    method: 'POST',
    body: JSON.stringify({
      attributes: {
        ...attributes,
        SOURCE: '1',
      },
      listIds: [18],
      email,
    }),
  })

  if (createUserRes.ok) {
    const data = await createUserRes.json()
    return data
  }

  const fetchUserRes = await constructRequest(`/contacts/${email}`, {
    method: 'GET',
  })

  if (!fetchUserRes.ok) {
    throw new Error('Error fetching user')
  }

  const data = await fetchUserRes.json()
  const id = data.id as number

  const updateUserRes = await constructRequest(`/contacts/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
      attributes: {
        ...attributes,
        EMAIL: email,
      },
      listIds: [18],
    }),
  })

  if (!updateUserRes.ok) {
    throw new Error('Error updating user')
  }

  return { id }
}

export const sendTemplateEmail = async (
  templateId: number,
  to: string,
  params?: Record<string, string>
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
