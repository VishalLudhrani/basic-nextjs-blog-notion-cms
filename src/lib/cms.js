import { initializeApp } from "firebase/app"
import { collection, getDocs, getFirestore, query, where } from "firebase/firestore"

const firebaseConfig = {
  apiKey: process.env.NEXT_APP_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_APP_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const blogListRef = collection(db, "blog")

export async function getBlogsList() {
  const blogs = await getDocs(blogListRef)
  return blogs.docs.map(d => {
    const data = d.data()
    return {
      id: data?.id,
      title: data?.metadata?.properties?.Name?.title?.[0]?.plain_text,
      slug: data?.metadata?.properties?.Slug?.rich_text?.[0]?.plain_text
    }
  })
}

export async function getBlogData(slug) {
  const blogQuery = query(blogListRef, where("slug", "==", slug))
  const blog = await getDocs(blogQuery);
  return blog.docs.at(0).data()
}