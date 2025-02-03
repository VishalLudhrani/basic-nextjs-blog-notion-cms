import { ImageResponse } from 'next/og'
 
// Image metadata
export const alt = 'Domdog : Page Security & Privacy Platform'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = "image/png"
 
// Image generation
export default async function Image() {
  // Font=
  async function loadGoogleFont (font, weight) {
    const url = `https://fonts.googleapis.com/css2?family=${font}:wght@${weight}`
    const css = await (await fetch(url)).text()
    console.log('font api response fetched')
    const resource = css.match(/src: url\((.+)\) format\('(opentype|truetype)'\)/)
    console.log('loading google font')
   
    if (resource) {
      const response = await fetch(resource[1])
      console.log('font resource was requested')
      if (response.status == 200) {
        console.log('google font fetched successfully for opengraph image at /')
        return await response.arrayBuffer()
      }
    }
   
    throw new Error('failed to load font data')
  }
 
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: 'linear-gradient(to bottom left, #475569, #0F1023)',
          justifyContent: 'space-between',
          position: 'relative',
        }}
      >
        <p
          style={{
            fontSize: 72,
            color: '#EEE',
            padding: '48px 48px 0'
          }}
        >
          Most Flexible & No-Nonsense Approach to 6.4.3 & 11.6.1
        </p>
      </div>
    ),
    // ImageResponse options
    {
      // For convenience, we can re-use the exported opengraph-image
      // size config to also set the ImageResponse's width and height.
      ...size,
      fonts: [
        {
          name: 'Hanken Grotesk',
          data: await loadGoogleFont('Hanken+Grotesk', 700),
          style: 'normal',
        },
      ],
    }
  )
}