import React, { useState, useEffect, useRef } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
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
    <View style={styles.videoWrapper}>
      <View style={styles.videoContainer}>
        <Video
          ref={videoRef}
          source={{ uri: videoData.videoUrl }}
          style={styles.video}
          controls={true}
          resizeMode="contain"
          paused={isPaused}
        />
      </View>
    </View>
  );
};

VideoSection.Loading = () => (
  <View style={styles.loadingContainer}>
    <ActivityIndicator size="large" />
    <Text variant="bodyLarge" style={styles.loadingText}>
      Cargando video...
    </Text>
  </View>
);

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
  },
  videoWrapper: {
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  videoContainer: {
    width: '100%',
    aspectRatio: 16 / 9,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
  },
  video: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default VideoSection;