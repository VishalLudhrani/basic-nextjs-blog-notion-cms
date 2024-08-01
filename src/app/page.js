import { redirect } from "next/navigation";

export default function Home() {
  redirect('/posts')
}

export const metadata = {
  title: "Blog app",
  description: "Blog app description",
  metadataBase: process.env.VERCEL_URL,
}
