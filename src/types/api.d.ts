import { type UserRecord } from 'firebase-admin/lib/auth/user-record'
import type { UserData } from './user'

interface ApiUser extends Omit<UserRecord, 'toJSON'> {
  data?: UserData
}
