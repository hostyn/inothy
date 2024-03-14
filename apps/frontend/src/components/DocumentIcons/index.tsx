import {
  DOCIcon,
  DOCXIcon,
  FileIcon,
  JPGIcon,
  PDFIcon,
  PNGIcon,
  PPTIcon,
  PPTXIcon,
  XLSIcon,
  XLSXIcon,
} from './Icons'

type FileType =
  | 'png'
  | 'jpg'
  | 'pdf'
  | 'doc'
  | 'docx'
  | 'ppt'
  | 'pptx'
  | 'xls'
  | 'xlsx'

const mimeTypes: Record<string, FileType | undefined> = {
  'image/png': 'png',
  'image/x-png': 'png',
  'image/jpeg': 'jpg',
  'image/pjpeg': 'jpg',
  'image/x-jpeg': 'jpg',
  'application/pdf': 'pdf',
  'application/x-pdf': 'pdf',
  'application/acrobat': 'pdf',
  'applications/vnd.pdf': 'pdf',
  'text/pdf': 'pdf',
  'text/x-pdf': 'pdf',
  'application/msword': 'doc',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
    'docx',
  'application/vnd.ms-powerpoint': 'ppt',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation':
    'pptx',
  'application/vnd.ms-excel': 'xls',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'xlsx',
}

interface DocumentIconProps {
  mimeType?: string
}

export default function DocumentIcon({
  mimeType,
}: DocumentIconProps): JSX.Element {
  if (mimeType == null) return <FileIcon />
  const file = mimeTypes[mimeType] ?? 'file'
  if (file === 'png') return <PNGIcon />
  if (file === 'jpg') return <JPGIcon />
  if (file === 'doc') return <DOCIcon />
  if (file === 'docx') return <DOCXIcon />
  if (file === 'ppt') return <PPTIcon />
  if (file === 'pptx') return <PPTXIcon />
  if (file === 'xls') return <XLSIcon />
  if (file === 'xlsx') return <XLSXIcon />
  if (file === 'pdf') return <PDFIcon />
  return <FileIcon />
}
