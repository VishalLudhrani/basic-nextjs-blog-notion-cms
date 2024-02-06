import * as fs from "fs";
import { getPostData, getPosts } from "@/lib/notion";
import Markdown from "react-markdown";
import remarkMdx from "remark-mdx";

async function getBlogTitle(slug) {
  const slugMap = JSON.parse(fs.readFileSync('public/slug-map.json', 'utf-8'));
  return slugMap[slug]?.title || "Blog post"
}

export const revalidate = 60;

export async function generateStaticParams() {
  const posts = await getPosts(process.env.NEXT_APP_NOTION_DB_ID);
  return posts?.map(post => ({
    slug: post?.properties?.Slug?.rich_text?.[0]?.text?.content
  }))
}

export async function generateMetadata({ params }) {
  const title = await getBlogTitle(params?.slug) || ""
  return {
    title
  }
}

export default async function BlogPage({ params }) {
  const slug = params?.slug;
  const post = await getPostData(slug)
  const postTitle = await getBlogTitle(params?.slug)

  return (
    <main className="container mx-auto px-8 my-10">
      <article className="prose prose-sm xl:prose-lg dark:prose-invert">
        <h1 className="text-3xl font-bold mb-4">{postTitle}</h1>
        <Markdown remarkPlugins={[ remarkMdx ]}>
          {post}
        </Markdown>
      </article>
    </main>
  )
}