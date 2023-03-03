export default function normalize(str: string): string {
  const string = str.normalize('NFD').replaceAll(/[\u0300-\u036f]/g, '')
  return string.toLowerCase()
}

export const currencyFormatter = new Intl.NumberFormat('es-ES', {
  style: 'currency',
  currency: 'EUR',
})
