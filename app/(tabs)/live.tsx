import React, { useEffect } from 'react';
import { ScrollView } from 'react-native';
import { useNavigation, useLocalSearchParams } from 'expo-router';
import { useVideoData } from '~/hooks/useVideoData';
import { Ticket } from '~/types/ticket';
import VideoSection from '~/components/home/live/VideoSection';
import TicketFormSection from '~/components/home/live/TicketFormSection';
import ResultsTable from '~/components/home/live/ResultsTable';
import LiveTitle from '~/components/home/live/LiveTitle';

export default function Live() {
  const { videoData, isLoading, refresh } = useVideoData();
  const navigation = useNavigation();
  const { refresh: refreshParam } = useLocalSearchParams<{ refresh?: string }>();

  useEffect(() => {
    if (refreshParam) {
      refresh();
    }
  }, [refreshParam, refresh]);

  useEffect(() => {
    if (!isLoading && videoData) {
      navigation.setOptions({
        headerTitle: () => <LiveTitle isLive={videoData.isLive} />,
      });
    }
  }, [isLoading, videoData, navigation]);

  if (isLoading) {
    return <VideoSection.Loading />;
  }

  const handleTicketSubmit = (ticket: Ticket) => {
    console.log('Consultando:', ticket);
  };

  return (
    <ScrollView contentContainerClassName="bg-white gap-8" showsVerticalScrollIndicator={false}>
      <VideoSection videoData={videoData} />
      <TicketFormSection onSubmit={handleTicketSubmit} />
      <ResultsTable />
    </ScrollView>
  );
}