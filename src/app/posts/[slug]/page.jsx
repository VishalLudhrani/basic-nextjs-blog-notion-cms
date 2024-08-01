import Markdown from "react-markdown";
import remarkMdx from "remark-mdx";
import { getBlogData, getBlogsList } from "@/lib/cms";
import { getPostData } from "@/lib/notion";
import Image from "next/image";

async function getBlogTitle(slug) {
  const blogs = await getBlogsList();
  const targetBlog = blogs.find(blog => blog.slug === slug);
  return targetBlog?.title ?? "Blog post"
}

export const revalidate = 8 * 60 * 60; // revalidate every 8 hours

export async function generateStaticParams() {
  const blogs = await getBlogsList();
  return blogs?.map(blog => ({
    slug: blog.slug ?? ""
  }))
}

export async function generateMetadata({ params }) {
  const title = await getBlogTitle(params?.slug) || ""
  return {
    title,
    description: "Blog description",
    metadataBase: process.env.VERCEL_URL,
    alternates: {
      canonical: `${process.env.VERCEL_URL}/posts/${params?.slug}`
    },
    openGraph:{
      title,
      description: "Blog description",
      metadataBase: process.env.VERCEL_URL
    }
  }
}

export default async function BlogPage({ params }) {
  const slug = params?.slug;
  // const post = await getPostData(slug)
  // console.log("post", post)
  const blog = await getBlogData(slug)
  const blogTitle = await getBlogTitle(params?.slug)

  return (
    <main className="container mx-auto px-8 my-10">
      <article className="prose prose-sm xl:prose-lg dark:prose-invert">
        <h1 className="text-3xl font-bold mb-4">{blogTitle}</h1>
        <Markdown
          remarkPlugins={[ remarkMdx ]}
          components={{
            h1(props) {
              const { children, className } = props
              return (
                <h1 className={`${className} text-cyan-300`}>{children}</h1>
              )
            },
            h2(props) {
              const { children, className } = props
              return (
                <h2 className={`${className} text-cyan-300`}>{children}</h2>
              )
            },
            h3(props) {
              const { children, className } = props
              return (
                <h3 className={`${className} text-cyan-300`}>{children}</h3>
              )
            },
            summary(props) {
              const { children } = props
              return (
                <summary>
                  {children}
                </summary>
              )
            },
            img(props) {
              return (
                <Image src={props.src} alt={props.alt} width={500} height={500} />
              )
            },
            "todo": (props) => {
              console.log('todo props', props);
              return <span>{JSON.stringify(props)}</span>
            }
          }}
        >
          {blog?.contentMd}
        </Markdown>
      </article>
    </main>
  )
}