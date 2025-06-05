import { useLocalSearchParams } from "expo-router";
import React, { useEffect } from "react";
import { ScrollView, View } from "react-native";
import { Text } from "react-native-paper";

import VideoSection from "~/components/home/live/VideoSection";
import { useLastRetransmission } from "~/hooks/useLastVideo";

export default function LastLive() {
  const { videoData, isLoading, error, refresh } = useLastRetransmission();
  const { refresh: refreshParam } = useLocalSearchParams<{ refresh?: string }>();

  useEffect(() => {
    if (refreshParam) {
      refresh();
    }
  }, [refreshParam, refresh]);

  if (isLoading) {
    return <VideoSection.Loading />;
  }

  if (error || !videoData) {
    return (
      <View className="flex-1 items-center justify-center p-4">
        <Text variant="bodyLarge" className="text-gray-700">
          {error || "No se encontraron retransmisiones disponibles"}
        </Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerClassName="bg-white gap-8" showsVerticalScrollIndicator={false}>
      <VideoSection videoData={videoData} />
    </ScrollView>
  );
}
