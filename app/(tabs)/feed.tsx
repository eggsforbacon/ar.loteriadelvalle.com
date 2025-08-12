import React from "react";
import { Image, SafeAreaView, ScrollView, View } from "react-native";

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
        {/*<LogosSection />*/}
        <View className="flex items-center justify-center">
          <Image
            source={require("../../assets/logos/logos_loteria_all.png")}
            className="h-52 w-96"
            resizeMode="contain"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
