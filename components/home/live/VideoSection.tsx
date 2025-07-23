import { useIsFocused } from "@react-navigation/native";
import React, { useState, useEffect, useRef } from "react";
import { View, ActivityIndicator, TouchableOpacity, Linking } from "react-native";
import { Text } from "react-native-paper";
import VideoPlayer from "react-native-video-player";

import LiveTitle from "./LiveTitle";

interface VideoData {
  videoUrl: string;
  isLive: boolean;
  permalink_url?: string;
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
        <VideoPlayer
          ref={videoRef}
          source={{ uri: videoData.videoUrl }}
          className="h-full w-full"
          style={{ width: "100%", height: "100%" }}
          resizeMode="contain"
          paused={isPaused}
        />
      </View>
      {videoData.isLive && videoData.permalink_url && (
        <TouchableOpacity
          className="mt-2.5 items-center rounded-lg bg-blue-500 p-2.5"
          onPress={() => Linking.openURL(videoData.permalink_url!)}>
          <Text style={{ color: "white", fontWeight: "bold" }}>Ver en Facebook</Text>
        </TouchableOpacity>
      )}
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
