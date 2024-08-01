import { getBlogsList } from "@/lib/cms";
import Link from "next/link";

export const revalidate = 8 * 60 * 60; // revalidate every 8 hours

export const metadata = {
  title: "Blog posts",
  description: "Blog posts",
  metadataBase: process.env.VERCEL_URL,
  openGraph:{
    title: "Blog landing page",
    description: "Blog landing page",
    metadataBase: new URL(process.env.VERCEL_URL)
  }
}

export default async function BlogLanding() {
  const posts = await getBlogsList();
  return (
    <main className="container mx-auto px-8 my-10">
      <h1 className="text-3xl font-bold mb-4">Blog Editorial</h1>
      <section className="grid grid-cols-4 gap-2">
        {posts.map(post => (
          <Link key={post?.id} href={`/posts/${post?.slug}`} className="px-4 py-2 border border-slate-400 rounded-md">
            {post?.title || ""}
          </Link>
        ))}
      </section>
    </main>
  )
}