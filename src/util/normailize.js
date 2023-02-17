export default function normalize (str) {
  const string = str.normalize('NFD').replaceAll(/[\u0300-\u036f]/, '')
  return string.toLowerCase()
}

export const currencyFormatter = new Intl.NumberFormat('es-ES', {
  style: 'currency',
  currency: 'EUR'
})
