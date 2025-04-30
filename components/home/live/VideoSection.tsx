import React, { useState, useEffect, useRef } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Text } from 'react-native-paper';
import Video from 'react-native-video';
import { useIsFocused } from '@react-navigation/native';

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
    <View className="p-4 bg-white">
      <View className="w-full aspect-[16/9] rounded-xl overflow-hidden bg-white">
        <Video
          ref={videoRef}
          source={{ uri: videoData.videoUrl }}
          className="w-full h-full"
          style={{ width: '100%', height: '100%' }}
          controls={true}
          resizeMode="contain"
          paused={isPaused}
        />
      </View>
    </View>
  );
};

VideoSection.Loading = () => (
  <View className="flex-1 justify-center items-center">
    <ActivityIndicator size="large" />
    <Text variant="bodyLarge" className="mt-4">
      Cargando video...
    </Text>
  </View>
);

export default VideoSection;