import React from "react";
import { Animated, View, useWindowDimensions } from "react-native";

import { Button } from "~/components/Button";
import { OnboardingItemProps } from "~/components/OnboardingItem";

type NavigationProps = {
  data: OnboardingItemProps[];
  scrollX: Animated.Value;
  scrollTo: (mode: "next" | "prev") => void;
  currentIndex: number;
  onComplete?: () => void;
};

export const NavigationBar = ({
  data,
  scrollX,
  scrollTo,
  currentIndex,
  onComplete,
}: NavigationProps) => {
  const { width } = useWindowDimensions();

  return (
    <View className="flex flex-col items-center justify-end">
      <View className="flex-row py-6">
        {data.map((_, i) => {
          const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
          const dotWidth = scrollX.interpolate({
            inputRange,
            outputRange: [10, 20, 10],
            extrapolate: "clamp",
          });
          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.2, 1, 0.2],
            extrapolate: "clamp",
          });
          return (
            <Animated.View
              className="mx-1 h-2.5 rounded-xl bg-primary-600"
              style={{ width: dotWidth, opacity }}
              key={i.toString()}
            />
          );
        })}
      </View>
      <View className="flex-row items-center justify-center gap-4 px-6 pb-4">
        <Button title="Anterior" className="flex-1" onPress={() => scrollTo("prev")} />
        {currentIndex === data.length - 1 ? (
          <Button title="Finalizar" className="flex-1" onPress={onComplete} />
        ) : (
          <Button title="Siguiente" className="flex-1" onPress={() => scrollTo("next")} />
        )}
      </View>
    </View>
  );
};
