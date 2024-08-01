import { ImageResponse } from 'next/og'
 
// Image metadata
export const alt = 'Notion CMS Blog'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'
 
// Image generation
export default async function Image({ params }) {
  // Font=
  const interBold = fetch(
    new URL('https://8font.com/wp-content/uploads/2022/03/Inter-Bold.ttf')
  ).then((res) => res.arrayBuffer())

  const slug = params?.slug;
  let text = slug;
  try {
    console.log('trying to fetch og');
    const response = await fetch(`${process.env.VERCEL_URL}/api/get-blog-metadata?slug=${slug}`);
    const data = await response.json();
    const targetBlog = data?.data;
    console.log('target blog', JSON.stringify(targetBlog))
    text = targetBlog?.title ?? "Blog post"
  } catch (e) {
    console.error('Error occurred while fetching open graph details', e)
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
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0f1023',
          padding: '150px'
        }}
      >
        <p
          style={{
            fontSize: 64,
            color: '#EEE',
            textAlign: 'center'
          }}
        >
          {text}
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
          name: 'Inter',
          data: await interBold,
          style: 'normal',
          weight: 600,
        },
      ],
    }
  )
}