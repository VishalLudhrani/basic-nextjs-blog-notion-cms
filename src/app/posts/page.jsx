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
    metadataBase: process.env.VERCEL_URL,
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
      <form method="POST" data-netlify="true">
        <ul className="flex flex-col sm:flex-row">
          <li className="inline-flex items-center gap-x-2.5 py-3 px-4 text-sm font-medium bg-white border text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg sm:-ms-px sm:mt-0 sm:first:rounded-se-none sm:first:rounded-es-lg sm:last:rounded-es-none sm:last:rounded-se-lg dark:bg-neutral-800 dark:border-neutral-700 dark:text-white">
            <div className="relative flex items-start w-full">
              <div className="flex items-center h-5">
                <input id="like" name="like-dislike" type="radio" className="border-gray-200 rounded-full disabled:opacity-50 dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" />
              </div>
              <label htmlFor="like" className="ms-3 block w-full text-sm text-gray-600 dark:text-neutral-500">
                Like
              </label>
            </div>
          </li>

          <li className="inline-flex items-center gap-x-2.5 py-3 px-4 text-sm font-medium bg-white border text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg sm:-ms-px sm:mt-0 sm:first:rounded-se-none sm:first:rounded-es-lg sm:last:rounded-es-none sm:last:rounded-se-lg dark:bg-neutral-800 dark:border-neutral-700 dark:text-white">
            <div className="relative flex items-start w-full">
              <div className="flex items-center h-5">
                <input id="dislike" name="like-dislike" type="radio" className="border-gray-200 rounded-full disabled:opacity-50 dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" />
              </div>
              <label htmlFor="dislike" className="ms-3 block w-full text-sm text-gray-600 dark:text-neutral-500">
                Dislike
              </label>
            </div>
          </li>
        </ul>
        <button type="submit" className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700">Submit</button>
      </form>
    </main>
  )
}