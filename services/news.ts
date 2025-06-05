import { decodeHtmlEntities } from "~/utils/htmlDecode";

export interface WPPost {
  id: number;
  title: { rendered: string };
  content: { rendered: string };
  uagb_featured_image_src?: {
    full: [string, number, number, boolean];
    medium: [string, number, number, boolean];
    thumbnail: [string, number, number, boolean];
  };
  _embedded?: {
    "wp:featuredmedia"?: { source_url: string }[];
  };
}

export interface NewsItem {
  id: string;
  title: string;
  imageUri: string;
}

export interface NewsDetail {
  id: string;
  title: string;
  imageUri: string;
  contentHtml: string;
}

const BASE_URL = "https://loteriadelvalle.com/wp-json/wp/v2";

export async function fetchLatestNews(): Promise<NewsItem[]> {
  const resp = await fetch(`${BASE_URL}/posts?per_page=4&_embed`);
  if (!resp.ok) throw new Error(`Error fetching news: ${resp.status}`);
  const data: WPPost[] = await resp.json();
  return data.map((post) => ({
    id: post.id.toString(),
    title: decodeHtmlEntities(post.title.rendered),
    imageUri:
      post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
      post.uagb_featured_image_src?.full[0] ||
      "",
  }));
}

export async function fetchNewsById(id: string): Promise<NewsDetail> {
  const resp = await fetch(`${BASE_URL}/posts/${id}?_embed`);
  if (!resp.ok) throw new Error(`Error fetching news detail: ${resp.status}`);
  const post: WPPost = await resp.json();
  return {
    id: post.id.toString(),
    title: decodeHtmlEntities(post.title.rendered),
    imageUri:
      post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
      post.uagb_featured_image_src?.full[0] ||
      "",
    contentHtml: post.content.rendered,
  };
}

export async function fetchAllNews(page: number): Promise<NewsItem[]> {
  const resp = await fetch(`${BASE_URL}/posts?per_page=5&page=${page}&_embed`);
  if (!resp.ok) throw new Error(`Error fetching news: ${resp.status}`);
  const data: WPPost[] = await resp.json();
  return data.map((post) => ({
    id: post.id.toString(),
    title: decodeHtmlEntities(post.title.rendered),
    imageUri:
      post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
      post.uagb_featured_image_src?.full[0] ||
      "",
  }));
}