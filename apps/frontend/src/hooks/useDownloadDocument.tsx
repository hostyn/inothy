import { trpc } from '@services/trpc'
import { useState } from 'react'

interface UseDownloadDocumentProps {
  documentId: string
}

interface UseDownloadDocumentReturn {
  download: () => Promise<void>
  reset: () => void
  loading: boolean
  progress: number
  downloaded: boolean
}

export default function useDownloadDocument({
  documentId,
}: UseDownloadDocumentProps): UseDownloadDocumentReturn {
  const [progress, setProgress] = useState(0)
  const [loading, setLoading] = useState(false)
  const [downloaded, setDownloaded] = useState(false)

  const getDownloadUrl = trpc.document.getDownloadUrl.useMutation()

  const download = async (): Promise<void> => {
    setLoading(true)
    const { documentName, url } = await getDownloadUrl.mutateAsync({
      documentId,
    })

    const response = await fetch(url)
    const contentLength = response.headers.get('content-length')
    const total = parseInt(contentLength ?? '', 10)
    let loaded = 0

    const res = new Response(
      new ReadableStream({
        async start(controller) {
          const reader = response.body?.getReader()
          if (reader == null) return
          for (;;) {
            const { done, value } = await reader.read()
            if (done) break
            loaded += value.byteLength
            setProgress(Number((loaded / total).toPrecision(2)))
            controller.enqueue(value)
          }
          controller.close()
        },
      })
    )
    const blob = await res.blob()
    const href = URL.createObjectURL(blob)
    const element = document.createElement('a')
    element.href = href
    element.download = documentName
    element.click()
    element.remove()
    URL.revokeObjectURL(href)
    setDownloaded(true)
    setLoading(false)
  }

  const reset = (): void => {
    setProgress(0)
    setLoading(false)
    setDownloaded(false)
  }

  return { download, reset, loading, progress, downloaded }
}
