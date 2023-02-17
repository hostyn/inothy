import { PDFDocument, rgb, StandardFonts } from 'pdf-lib'

const primary = rgb(234 / 255, 0, 41 / 255)
const secondary = rgb(22 / 255, 61 / 255, 107 / 255)

export default async function makePreview (url) {
  const arrayBuffer = await fetch(url).then((res) => res.arrayBuffer())

  const pdf = await PDFDocument.load(arrayBuffer)

  pdf.setTitle('Inothy')
  pdf.setAuthor('Inothy')
  pdf.setCreator('Inothy')
  pdf.setProducer('Inothy.com')

  const shownPages =
    pdf.getPageCount() >= 10
      ? [...Array(Math.trunc(pdf.getPageCount() * 0.2)).keys()].map(
          (i) => i * 2
        )
      : pdf.getPageCount() >= 3
        ? [0]
        : []

  const hiddenPages = [...Array(pdf.getPageCount()).keys()].filter(
    (i) => !shownPages.includes(i)
  )

  await Promise.all(
    hiddenPages.map(async (i) => {
      // Replace page
      const { width, height } = pdf.getPage(i).getSize()
      pdf.removePage(i)
      pdf.insertPage(i, [width, height])

      // Get new page object
      const page = pdf.getPage(i)

      // Load font
      const helveticaFont = await pdf.embedFont(StandardFonts.Helvetica)
      page.setFont(helveticaFont)

      // Get sizes
      const originalSize = 60
      const logoSize = min(width, height) * 0.2
      const scale = logoSize / originalSize

      const fontSize = min(width, height) * 0.03
      const text = 'Compra el documento para verlo completo'
      const textSize = helveticaFont.widthOfTextAtSize(text, fontSize)

      drawLogo(
        page,
        (width - logoSize) / 2,
        height - (height - logoSize - fontSize * 4) / 2,
        scale
      )

      page.drawText(text, {
        size: fontSize,
        color: secondary,
        x: (width - textSize) / 2,
        y:
          height -
          (height - logoSize - fontSize * 4) / 2 -
          logoSize -
          fontSize * 3
      })
    })
  )

  // GUARDAR PDF
  return await pdf.save()
}

function min (a, b) {
  return a > b ? b : a
}

function drawLogo (page, x, y, scale) {
  const options = {
    x,
    y,
    scale,
    color: primary
  }

  page.drawSvgPath(
    'M24.81,44.12l3.48-3.48.13-.13a.33.33,0,0,0,.13-.26V30.74a8.15,8.15,0,0,0-8.14-8.14h-9.2a.35.35,0,0,0-.35.34V41.79A5.19,5.19,0,0,0,16.06,47H17.6a.35.35,0,0,0,.35-.34V30a.35.35,0,0,1,.34-.35h2.12a1.07,1.07,0,0,1,1.06,1.06v15.9a.34.34,0,0,0,.34.34h1.9a.35.35,0,0,0,.34-.4A2.72,2.72,0,0,1,24.81,44.12Z',
    options
  )
  page.drawSvgPath(
    'M49.16,22.61H40a8.15,8.15,0,0,0-8.14,8.14v9.4a.35.35,0,0,0,.13.27,2.75,2.75,0,0,1,.26.22l3.47,3.48a2.75,2.75,0,0,1,.75,2.54.34.34,0,0,0,.33.41h4.61a8.15,8.15,0,0,0,8.15-8.15V23A.35.35,0,0,0,49.16,22.61ZM42.42,38.92A1.06,1.06,0,0,1,41.36,40H39.24a.35.35,0,0,1-.35-.35V30.75A1.07,1.07,0,0,1,40,29.69h1.76a.71.71,0,0,1,.71.72Z',
    options
  )
  page.drawSvgPath(
    'M34.37,45l-2.56-2.55-.72-.73a1.21,1.21,0,0,0-1.7,0l-.84.85L26.11,45a1.55,1.55,0,0,0-.18,2h0l3.32,4.87a1.2,1.2,0,0,0,2,0l3.26-4.78.06-.09A1.55,1.55,0,0,0,34.37,45Z',
    options
  )
  page.drawSvgPath(
    'M46.05,15.26l-1-.1H45a.33.33,0,0,1-.31-.34v-5a.35.35,0,0,0-.33-.34l-1.1,0c-.34,0-7.82-.24-13.18,3.64a.33.33,0,0,1-.4,0C24.26,9.14,16.75,9.37,16.4,9.38l-1.1,0a.34.34,0,0,0-.33.34v5a.35.35,0,0,1-.31.34h-.07l-1,.11a.35.35,0,0,0-.31.34v4.9a.35.35,0,0,0,.35.34h2.28a.35.35,0,0,0,.35-.34V18.36a.34.34,0,0,1,.34-.34c2.83,0,8.56.42,11.73,3.84l.24.27H31.1l.11-.11.1-.12C34.48,18.48,40.21,18,43,18.05a.34.34,0,0,1,.34.34V20.5a.35.35,0,0,0,.35.35H46a.35.35,0,0,0,.35-.35V15.61A.36.36,0,0,0,46.05,15.26ZM28.3,17.38a.34.34,0,0,1-.52.29,20.91,20.91,0,0,0-9.51-2.59.34.34,0,0,1-.32-.34v-2a.34.34,0,0,1,.36-.35c2.41.18,6.74.84,9.86,3.28a.34.34,0,0,1,.13.27Zm13.36-2.61a.34.34,0,0,1-.32.34,21.17,21.17,0,0,0-9.51,2.59.34.34,0,0,1-.52-.29V16a.37.37,0,0,1,.13-.27c3.12-2.44,7.45-3.1,9.86-3.27a.33.33,0,0,1,.36.34Z',
    options
  )
  page.drawSvgPath(
    'M46.82,60.37H13.55A13.57,13.57,0,0,1,0,46.82V13.55A13.57,13.57,0,0,1,13.55,0H46.82A13.57,13.57,0,0,1,60.37,13.55V46.82A13.57,13.57,0,0,1,46.82,60.37ZM13.55,5.09a8.46,8.46,0,0,0-8.46,8.46V46.82a8.46,8.46,0,0,0,8.46,8.46H46.82a8.46,8.46,0,0,0,8.46-8.46V13.55a8.46,8.46,0,0,0-8.46-8.46Z',
    {
      ...options,
      color: secondary
    }
  )
}
