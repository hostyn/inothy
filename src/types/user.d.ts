import { type User as FirebaseUser } from 'firebase/auth'

interface User extends FirebaseUser {
  data?: FirestoreUser
}
