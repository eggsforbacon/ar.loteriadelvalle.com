import { useState, useEffect } from 'react';
import { fetchNewsById, NewsDetail } from '~/services/news';

export function useNewsDetail(id: string | undefined) {
  const [post, setPost] = useState<NewsDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    fetchNewsById(id)
      .then(setPost)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  return { post, loading, error };
}