import React, { useEffect } from 'react';
import { ScrollView, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useVideoData } from '~/hooks/useVideoData';
import { Ticket } from '~/types/ticket';
import VideoSection from '~/components/home/live/VideoSection';
import TicketFormSection from '~/components/home/live/TicketFormSection';
import ResultsTable from '~/components/home/live/ResultsTable';

export default function Live() {
  const { videoData, isLoading, refresh } = useVideoData();
  const { refresh: refreshParam } = useLocalSearchParams<{ refresh?: string }>();

  useEffect(() => {
    if (refreshParam) {
      refresh();
    }
  }, [refreshParam, refresh]);  

  const handleTicketSubmit = (ticket: Ticket) => {
    console.log('Consultando:', ticket);
  };

  if (isLoading) {
    return <VideoSection.Loading />;
  }

  return (
    <ScrollView contentContainerClassName="bg-white gap-8" showsVerticalScrollIndicator={false}>
      <VideoSection videoData={videoData} />
      <TicketFormSection onSubmit={handleTicketSubmit} />
      <ResultsTable />
    </ScrollView>
  );
}