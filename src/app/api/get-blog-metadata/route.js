import { getBlogsList } from "@/lib/cms";

export async function GET(req) {
  let data = null
  let message = "No data found"
  let statusCode = 404
  const slug = req?.nextUrl?.searchParams?.get("slug");
  if (slug?.length) {
    const blogs = await getBlogsList();
    data = blogs.find(blog => blog.slug === slug);
    statusCode = 200
    message = "Blog metadata was fetched"
  }
  return new Response(JSON.stringify({ data, message }), { status: statusCode })
}