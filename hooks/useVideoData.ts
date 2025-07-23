import Constants from "expo-constants";
import { useState, useEffect, useCallback } from "react";

export const useVideoData = () => {
  const [videoData, setVideoData] = useState<{
    videoUrl: string;
    isLive: boolean;
    permalink_url?: string;
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
      console.log("Error al obtener datos del video:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchVideoData();
  }, [fetchVideoData]);

  return { videoData, isLoading, refresh: fetchVideoData };
};
