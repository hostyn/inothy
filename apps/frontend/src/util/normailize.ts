export default function normalize(str: string): string {
  const string = str.normalize('NFD').replaceAll(/[\u0300-\u036f]/g, '')
  return string.toLowerCase()
}

export const currencyFormatter = new Intl.NumberFormat('es-ES', {
  style: 'currency',
  currency: 'EUR',
})

export const formatBytes = (bytes: string | number, decimals = 2): string => {
  if (+bytes === 0) return '0 Bytes'

  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = [
    'Bytes',
    'KiB',
    'MiB',
    'GiB',
    'TiB',
    'PiB',
    'EiB',
    'ZiB',
    'YiB',
  ]

  const i = Math.floor(Math.log(Number(bytes)) / Math.log(k))

  return `${parseFloat((Number(bytes) / Math.pow(k, i)).toFixed(dm))} ${
    sizes[i]
  }`
}
