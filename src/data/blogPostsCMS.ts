import { BlogPostCMS } from "./blog/types";
import { postsBatch1 } from "./blog/postsBatch1";
import { postsBatch2 } from "./blog/postsBatch2";
import { postsBatch3 } from "./blog/postsBatch3";
import { postsBatch4 } from "./blog/postsBatch4";
import { postsBatch5 } from "./blog/postsBatch5";
import { posts30Batch1 } from "./blog/posts30Batch1";
import { posts30Batch2 } from "./blog/posts30Batch2";
import { posts30Batch3 } from "./blog/posts30Batch3";
import { posts30Batch4 } from "./blog/posts30Batch4";
import { posts30Batch5 } from "./blog/posts30Batch5";

export const SEO_BLOG_POSTS: BlogPostCMS[] = [
  ...posts30Batch1,
  ...posts30Batch2,
  ...posts30Batch3,
  ...posts30Batch4,
  ...posts30Batch5,
  ...postsBatch1,
  ...postsBatch2,
  ...postsBatch3,
  ...postsBatch4,
  ...postsBatch5,
];

export function getBlogPostBySlug(slug: string): BlogPostCMS | undefined {
  return SEO_BLOG_POSTS.find((p) => p.slug === slug);
}

