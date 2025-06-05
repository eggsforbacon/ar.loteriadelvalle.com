import React from "react";
import { SafeAreaView, ScrollView } from "react-native";

import LogosSection from "~/components/LogosSection";
import SocialSection from "~/components/SocialMedia";
import LatestWinnerSection from "~/components/home/feed/LatestWinnerSection";
import NewsCarousel from "~/components/home/feed/NewsCarousel";
import NextDrawCountdown from "~/components/home/feed/NextDrawCountdown";

export default function Feed() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView contentContainerClassName="gap-8 pb-4" showsVerticalScrollIndicator={false}>
        <LatestWinnerSection />
        <NextDrawCountdown />
        <NewsCarousel />
        <SocialSection />
        <LogosSection />
      </ScrollView>
    </SafeAreaView>
  );
}
