import Constants from "expo-constants";
import { useState, useEffect, useCallback } from "react";

export const useLastRetransmission = () => {
  const [videoData, setVideoData] = useState<{
    videoUrl: string;
    isLive: boolean;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLastRetransmission = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const apiUrl = Constants.expoConfig?.extra?.apiUrl;
      const response = await fetch(`${apiUrl}/get-last-retransmission`);
      if (!response.ok) {
        throw new Error("Error al obtener la última retransmisión");
      }
      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }
      setVideoData(data);
    } catch (error: any) {
      console.error("Error al obtener la última retransmisión:", error);
      setError(error.message || "Error al obtener la última retransmisión");
      setVideoData(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLastRetransmission();
  }, [fetchLastRetransmission]);

  return { videoData, isLoading, error, refresh: fetchLastRetransmission };
};
