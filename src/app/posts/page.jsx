import { getPosts } from "@/lib/notion";
import Link from "next/link";

export const revalidate = 60;

export const metadata = {
  title: "Blog posts",
  description: "Blog posts"
}

export default async function BlogLanding() {
  const posts = await getPosts(process.env.NEXT_APP_NOTION_DB_ID);
  return (
    <main className="container mx-auto px-8 my-10">
      <h1 className="text-3xl font-bold mb-4">Blog Editorial</h1>
      <section className="grid grid-cols-4 gap-2">
        {posts.map(post => (
          <Link key={post?.id} href={`/posts/${post?.properties?.Slug?.rich_text?.[0]?.text?.content}`} className="px-4 py-2 border border-slate-400 rounded-md">
            {post?.properties?.Name?.title?.[0]?.text?.content || ""}
          </Link>
        ))}
      </section>
    </main>
  )
}