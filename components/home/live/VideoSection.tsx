import { useIsFocused } from "@react-navigation/native";
import React, { useState, useEffect, useRef } from "react";
import { View, ActivityIndicator } from "react-native";
import { Text } from "react-native-paper";
import Video from "react-native-video";

import LiveTitle from "./LiveTitle";

interface VideoData {
  videoUrl: string;
  isLive: boolean;
}

interface VideoSectionProps {
  videoData: VideoData | null;
}

const VideoSection = ({ videoData }: VideoSectionProps) => {
  const videoRef = useRef<any>(null);
  const isFocused = useIsFocused();
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    setIsPaused(!isFocused);
  }, [isFocused]);

  if (!videoData) {
    return <VideoSection.Loading />;
  }

  return (
    <View className="gap-4 bg-white p-4">
      <View className="items-center">
        <LiveTitle isLive={videoData.isLive} />
      </View>
      <View className="aspect-[16/9] w-full overflow-hidden rounded-xl bg-white">
        <Video
          ref={videoRef}
          source={{ uri: videoData.videoUrl }}
          className="h-full w-full"
          style={{ width: "100%", height: "100%" }}
          controls
          resizeMode="contain"
          paused={isPaused}
        />
      </View>
    </View>
  );
};

VideoSection.Loading = () => (
  <View className="flex-1 items-center justify-center">
    <ActivityIndicator size="large" />
    <Text variant="bodyLarge" className="mt-4">
      Cargando video...
    </Text>
  </View>
);

export default VideoSection;
