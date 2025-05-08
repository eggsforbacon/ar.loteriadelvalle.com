import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

const LiveIcon = ({ isLive }: { isLive: boolean }) => {
  const opacity = useSharedValue(1);

  useEffect(() => {
    if (isLive) {
      opacity.value = withRepeat(withTiming(0, { duration: 500 }), -1, true);
    } else {
      opacity.value = 1;
    }
  }, [isLive]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.View style={animatedStyle}>
      <MaterialCommunityIcons name="broadcast" size={24} color={isLive ? "red" : "gray"} />
    </Animated.View>
  );
};

const LiveTitle = ({ isLive }: { isLive: boolean }) => (
  <View className="align-middle flex-row mt-2">
    <Text className='text-brand-dark-red mx-2 text-2xl font-bold'>{isLive ? "En Vivo" : "Última retransmisión"}</Text>
    <LiveIcon isLive={isLive} />
  </View>
);

export default LiveTitle;