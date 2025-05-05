import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withTiming,
  runOnJS,
} from "react-native-reanimated";

interface FlipUnitProps {
  value: number;
}

export default function FlipUnit({ value }: FlipUnitProps) {
  const [displayValue, setDisplayValue] = useState(value);
  const flip = useSharedValue(0);

  useEffect(() => {
    if (displayValue === value) return;

    flip.value = withSequence(
      withTiming(90, { duration: 300 }, () => {
        "worklet";
        runOnJS(setDisplayValue)(value);
      }),
      withTiming(0, { duration: 300 })
    );
  }, [value]);

  const style = useAnimatedStyle(() => ({
    transform: [{ perspective: 1000 }, { rotateX: `${flip.value}deg` }],
    backfaceVisibility: "hidden",
  }));

  return (
    <View className="flex-1">
      <Animated.View
        className="flex-1 items-center justify-center rounded-lg bg-accent-400"
        style={[styles.card, style]}>
        <Text className="text-2xl font-bold text-black">
          {String(displayValue).padStart(2, "0")}
        </Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backfaceVisibility: "hidden",
  },
});
