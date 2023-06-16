export const ALGOLIA_APP_ID = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID 
export const ALGOLIA_SEARCH_KEY = process.env
  .NEXT_PUBLIC_ALGOLIA_SEARCH_KEY 
export const ALGOLIA_INDEX = process.env.NEXT_PUBLIC_ALGOLIA_INDEX 
export const FIREBASE_PUBLIC = process.env.NEXT_PUBLIC_FIREBASE 
export const FIREBASE_ADMIN_CREDENTIALS = process.env
  .FIREBASE_ADMIN_CREDENTIALS 

export const MANGOPAY_CLIENT_ID = process.env.MANGOPAY_CLIENT_ID 
export const MANGOPAY_API_KEY = process.env.MANGOPAY_API_KEY 
export const MANGOPAY_ENDPOINT = process.env.MANGOPAY_ENDPOINT 
export const FRONTEND_URL = process.env.NEXT_PUBLIC_FRONTEND_URL 
export const NOREPLY_USER = process.env.NOREPLY_USER 
export const NOREPLY_PASS = process.env.NOREPLY_PASS 
export const MIN_PRICE = parseFloat(process.env.NEXT_PUBLIC_MIN_PRICE )
export const MAX_PRICE = parseFloat(process.env.NEXT_PUBLIC_MAX_PRICE )

export const TIKTOK_PIXEL_ID = process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID 
export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID 

export const BADGE_NAMES = {
  ambassador: 'Embajador',
  bronze: 'Bronze',
  silver: 'Plata',
  gold: 'Oro',
}


export const REFUSE_REASONS = {
  DOCUMENT_UNREADABLE:
    'El documento ha sido rechazado porque no se puede leer.',
  DOCUMENT_NOT_ACCEPTED:
    'El documento ha sido rechazado porque no se acepta ese tipo de documento.',
  DOCUMENT_HAS_EXPIRED:
    'El documento ha sido rechazado porque estaba expirado.',
  DOCUMENT_INCOMPLETE:
    'El documento ha sido rechazado porque estaba incompleto.',
  DOCUMENT_MISSING:
    'El documento ha sido rechazado porque no aparecia en los archivos enviados.',
  DOCUMENT_DO_NOT_MATCH_USER_DATA:
    'El documento ha sido rechazado porque la información no concuerda con la del usuario.',
  DOCUMENT_DO_NOT_MATCH_ACCOUNT_DATA:
    'El documento ha sido rechazado porque la información no concuerda con la del usuario.',
  DOCUMENT_FALSIFIED:
    'El documento ha sido rechazado porque se sospecha que ha sido falsificado.',
  UNDERAGE_PERSON:
    'El documento ha sido rechazado porque es necesario ser mayor de edad.',
  SPECIFIC_CASE: 'El documento ha sido rechazado por un caso específico.'
}