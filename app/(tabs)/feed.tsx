import React from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import NewsCarousel from '~/components/home/feed/NewsCarousel';
import NextDrawCountdown from '~/components/home/feed/NextDrawCountdown';
import LatestWinnerSection from '~/components/home/feed/LatestWinnerSection';
import SocialSection from '~/components/SocialMedia';

export default function Feed() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        contentContainerClassName="gap-8 pb-4"
        showsVerticalScrollIndicator={false}
      >
          <NextDrawCountdown />
          <LatestWinnerSection />
          <NewsCarousel />
          <SocialSection />
      </ScrollView>
    </SafeAreaView>
  );
}