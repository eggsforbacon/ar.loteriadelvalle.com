import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useState, useRef } from "react";
import { View, FlatList, Animated, Image } from "react-native";

import { OnboardingItem } from "./OnboardingItem";

import { NavigationBar } from "~/components/NavigationBar";
import {
  registerForPushNotificationsAsync,
  requestCameraPermissionsAsync,
} from "~/contexts/AppContext";
import onboarding from "~/data/onboarding";

export const Onboarding = () => {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef<FlatList>(null);
  const viewableItemsChanged = useRef(({ viewableItems }: any) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;
  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;
  const scrollTo = (mode: "next" | "prev") => {
    switch (mode) {
      case "next":
        if (currentIndex < onboarding.length - 1) {
          slidesRef.current!.scrollToIndex({ index: currentIndex + 1 });
        }
        break;
      case "prev":
        if (currentIndex > 0) {
          slidesRef.current!.scrollToIndex({ index: currentIndex - 1 });
        }
        break;
    }
  };

  const completeOnboarding = async () => {
    try {
      await AsyncStorage.setItem("hasVisited", "true");
      await registerForPushNotificationsAsync();
      await requestCameraPermissionsAsync();
      router.replace("/feed");
    } catch (error) {
      console.error("Error al guardar en AsyncStorage:", error);
    }
  };

  return (
    <View className="flex-1 items-center justify-center">
      <View className="w-full flex-row items-center justify-center">
        <Image
          source={require("../assets/logos/logos_loteria_all.png")}
          className="h-52 w-96"
          resizeMode="contain"
        />
      </View>
      <View className="flex-[2]">
        <FlatList
          data={onboarding}
          renderItem={({ item }) => <OnboardingItem item={item} />}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          keyExtractor={(item) => item.id.toString()}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
            useNativeDriver: false,
          })}
          scrollEventThrottle={32}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
          ref={slidesRef}
        />
      </View>

      <NavigationBar
        data={onboarding}
        scrollX={scrollX}
        scrollTo={scrollTo}
        currentIndex={currentIndex}
        onComplete={completeOnboarding}
      />
    </View>
  );
};
