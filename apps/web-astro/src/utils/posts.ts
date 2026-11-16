import { type CollectionEntry, getCollection } from 'astro:content';
import readingTime from 'reading-time';

export type Post = CollectionEntry<'blog'>;

export async function getPublishedPosts(): Promise<Post[]> {
  const posts = await getCollection('blog', ({ data }) => data.published);
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export function postUrl(post: Post): string {
  return `/${post.id}/`;
}

export function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    day: '2-digit',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

export function getReadingTime(post: Post): string {
  return readingTime(post.body ?? '').text;
}

export function getTags(post: Post): string[] {
  return post.data.tags ? post.data.tags.split(',').map((tag) => tag.trim()) : [];
}

export function getExcerpt(post: Post, pruneLength = 140): string {
  const text = (post.body ?? '')
    .replace(/^import .*$/gm, '')
    .replace(/```[\s\S]*?```/g, '')
    .replace(/<[^>]+>/g, '')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[#>*_`~]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  if (text.length <= pruneLength) {
    return text;
  }
  const cut = text.slice(0, pruneLength + 1);
  return `${cut.slice(0, cut.lastIndexOf(' '))}…`;
}

export function getDescription(post: Post): string {
  return post.data.description || getExcerpt(post);
}
