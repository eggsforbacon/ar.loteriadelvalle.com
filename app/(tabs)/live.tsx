import React, { useState, useEffect, useRef } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
import Video from 'react-native-video';
import { useIsFocused } from '@react-navigation/native';
import Constants from 'expo-constants';

export default function Live() {
  const [videoData, setVideoData] = useState<{
    videoUrl: string;
    isLive: boolean;
    events?: { name: string; timestamp: number }[];
  } | null>(null);

  const [isPaused, setIsPaused] = useState(false);
  const videoRef = useRef<any>(null);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      setIsPaused(false);
    } else {
      setIsPaused(true);
    }
  }, [isFocused]);

  useEffect(() => {
    const fetchVideoData = async () => {
      try {
        const apiUrl = Constants.expoConfig?.extra?.apiUrl;
        const response = await fetch(`${apiUrl}/get-current-video`);
        const data = await response.json();
        setVideoData(data);
      } catch (error) {
        console.error('Error al obtener datos del video:', error);
      }
    };
    fetchVideoData();
  }, []);

  const seekToTime = (timestamp: number) => {
    if (videoRef.current) {
      videoRef.current.seek(timestamp);
    }
  };

  if (!videoData) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
        <Text variant="bodyLarge" style={styles.loadingText}>
          Cargando video...
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
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
      {!videoData.isLive && videoData.events && (
        <View style={styles.eventsContainer}>
          <Text variant="titleMedium" style={styles.eventsTitle}>
            Eventos
          </Text>
          {videoData.events.map((event) => (
            <Button
              key={event.name}
              mode="contained"
              onPress={() => seekToTime(event.timestamp)}
              style={styles.eventButton}
              labelStyle={styles.buttonLabel}
            >
              {event.name}
            </Button>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
  },
  container: {
    flex: 1,
  },
  videoContainer: {
    width: '100%',
    height: 320,
    borderRadius: 20,
    backgroundColor: '#bb0014',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  eventsContainer: {
    paddingHorizontal: 16,
  },
  eventsTitle: {
    marginBottom: 8,
  },
  eventButton: {
    marginVertical: 8,
  },
  buttonLabel: {
    fontSize: 16,
  },
});