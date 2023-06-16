const blobToBase64 = async (
  blob: Blob
): Promise<string | ArrayBuffer | null> => {
  return await new Promise(resolve => {
    const reader = new FileReader()
    reader.onloadend = () => {
      resolve(reader.result)
    }
    reader.readAsDataURL(blob)
  })
}

export default blobToBase64
