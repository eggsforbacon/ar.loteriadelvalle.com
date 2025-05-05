import React, { useState, useRef } from "react";
import { View, FlatList, Animated } from "react-native";

import { OnboardingItem } from "./OnboardingItem";

import { NavigationBar } from "~/components/NavigationBar";
import onboarding from "~/data/onboarding";

export const Onboarding = () => {
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
  return (
    <View className={styles.container}>
      <View className={styles.listContainer}>
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
      />
    </View>
  );
};

const styles = {
  container: `items-center flex-1 justify-center`,
  listContainer: `flex-[3]`,
};
