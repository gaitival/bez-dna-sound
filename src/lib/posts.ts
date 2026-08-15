import { BLOG_POSTS } from "@/data/blogPosts";

export type Post = {
  slug: string;
  title: string;
  date: string;
  type: string;
  protocol: string;
  description: string;
  image: string;
  summary: string;
  paragraphs: string[];
};

export type DbPost = {
  id: string;
  slug: string;
  title: string;
  description: string;
  summary: string;
  type: string;
  protocol: string;
  image: string;
  body: string;
  published: boolean;
  published_at: string;
};

export function dbPostToPost(row: {
  slug: string;
  title: string;
  description: string;
  summary: string;
  type: string;
  protocol: string;
  image: string;
  body: string;
  published_at: string;
}): Post {
  return {
    slug: row.slug,
    title: row.title,
    date: row.published_at,
    type: row.type || "разбор состояния",
    protocol: row.protocol,
    description: row.description,
    image: row.image || "/images/blog/strakh-ne-uhodit.webp",
    summary: row.summary || row.description,
    paragraphs: row.body.split("\n").map((line) => line.trimEnd()),
  };
}

/** Статьи из базы (новые) + статьи из кода (исходные три), без дублей по slug. */
export function mergePosts(dbPosts: Post[]): Post[] {
  const seen = new Set(dbPosts.map((p) => p.slug));
  const all = [...dbPosts, ...(BLOG_POSTS as Post[]).filter((p) => !seen.has(p.slug))];
  return all.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}
