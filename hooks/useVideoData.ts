import { useState, useEffect, useCallback } from 'react';
import Constants from 'expo-constants';

export const useVideoData = () => {
  const [videoData, setVideoData] = useState<{
    videoUrl: string;
    isLive: boolean;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchVideoData = useCallback(async () => {
    try {
      setIsLoading(true);
      const apiUrl = Constants.expoConfig?.extra?.apiUrl;
      const response = await fetch(`${apiUrl}/get-current-video`);
      const data = await response.json();
      setVideoData(data);
    } catch (error) {
      console.error('Error al obtener datos del video:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchVideoData();
  }, [fetchVideoData]);

  return { videoData, isLoading, refresh: fetchVideoData };
};