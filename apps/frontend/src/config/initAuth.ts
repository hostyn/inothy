import { init } from 'next-firebase-auth'

interface FirebaseClient {
  apiKey: string
  authDomain: string
  projectId: string
  storageBucket: string
  messagingSenderId: string
  appId: string
}

const FIREBASE_CLIENT: FirebaseClient = JSON.parse(
  process.env.NEXT_PUBLIC_FIREBASE ?? ''
)

const FIREBASE_ADMIN_CREDENTIALS = JSON.parse(
  process.env.FIREBASE_ADMIN_CREDENTIALS ?? '{}'
)

const initAuth = (): void => {
  init({
    authPageURL: '/auth',
    appPageURL: '/',
    loginAPIEndpoint: '/api/login',
    logoutAPIEndpoint: '/api/logout',
    firebaseAdminInitConfig: {
      credential: {
        projectId: FIREBASE_ADMIN_CREDENTIALS.project_id,
        clientEmail: FIREBASE_ADMIN_CREDENTIALS.client_email,
        // The private key must not be accessible on the client side.
        privateKey: FIREBASE_ADMIN_CREDENTIALS.private_key,
      },
      databaseURL: 'https://my-example-app.firebaseio.com',
    },
    // Use application default credentials (takes precedence over firebaseAdminInitConfig if set)
    // useFirebaseAdminDefaultCredential: true,
    firebaseClientInitConfig: {
      apiKey: FIREBASE_CLIENT.apiKey, // required
      authDomain: FIREBASE_CLIENT.authDomain,
      projectId: FIREBASE_CLIENT.projectId,
    },
    cookies: {
      name: 'LlantasFames', // required
      // Keys are required unless you set `signed` to `false`.
      // The keys cannot be accessible on the client side.
      keys: [
        process.env.COOKIE_SECRET_CURRENT,
        process.env.COOKIE_SECRET_PREVIOUS,
      ],
      httpOnly: true,
      maxAge: 12 * 60 * 60 * 24 * 1000, // twelve days
      overwrite: true,
      path: '/',
      sameSite: 'strict',
      secure: true, // set this to false in local (non-HTTPS) development
      signed: true,
    },
  })
}

export default initAuth
