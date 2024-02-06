import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";
import * as fs from "fs";
import path from "path";
import { remark } from "remark";
import remarkMdx from "remark-mdx";

const POSTS_DIR = path.join(process.cwd(), "posts");

const notionClient = new Client({
  auth: process.env.NEXT_APP_NOTION_SECRET
})

const n2m = new NotionToMarkdown({ notionClient })

export async function getPosts(dbId) {
  const slugMap = {};

  const response = await notionClient.databases.query({
    database_id: dbId,
  });

  response.results.forEach((res, index) => {
    slugMap[res.properties?.Slug?.rich_text?.[0]?.text?.content || `${index}`] = {
      id: res.id,
      title: res.properties?.Name?.title?.[0]?.text?.content || ""
    }
  })

  console.log('posts retrieved');

  fs.writeFileSync('public/slug-map.json', JSON.stringify(slugMap))

  return response.results;
}

export async function getPostMd(slug) {
  let postId = "";
  const slugMap = JSON.parse(fs.readFileSync('public/slug-map.json', 'utf-8'));
  postId = slugMap[slug]?.id;
  const mdblocks = await n2m.pageToMarkdown(postId);
  const mdString = n2m.toMarkdownString(mdblocks);

  console.log('post markdown processed');

  return mdString?.parent || ""
}

export async function getPostData(slug) {
  const mdString = await getPostMd(slug)
  const content = await remark().use(remarkMdx).process(mdString)
  const contentHtml = content.toString();
  console.log('post data retrieved');

  return contentHtml;
}

export async function getPostsMarkdown(posts) {
  for (const post of posts) {
    const uuid = post.id;
    const slug = post.properties.Slug.rich_text[0].plain_text;
    const mdblocks = await n2m.pageToMarkdown(uuid);
    const mdString = n2m.toMarkdownString(mdblocks);
    const filename = `${POSTS_DIR}/${slug}.mdx`;

    console.log('post markdown retrieved');

    if (!fs.existsSync(POSTS_DIR)) {
      fs.mkdirSync(POSTS_DIR);
    }

    fs.writeFile(filename, mdString?.parent, (err) => {
      err !== null && console.log(err);
    });
  }
}