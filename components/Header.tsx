import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { View, Pressable } from "react-native";
import Animated, {
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

import { useNotificationsStore } from "~/store/useNotifications";

interface HeaderProps {
  title?: string;
  onMenuPress: () => void;
  onRefresh?: () => void;
  onBellPress?: () => void;
  rotate?: Animated.SharedValue<number>;
  bellScale?: Animated.SharedValue<number>;
  refreshing?: boolean;
}

export default function Header({
  onMenuPress,
  onRefresh,
  onBellPress,
  rotate,
  bellScale,
}: HeaderProps) {
  const unreadCount = useNotificationsStore((s) => s.notifications.length);

  const spinStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${(rotate?.value || 0) * 2 * Math.PI}rad` }],
  }));

  const bellStyle = useAnimatedStyle(() => ({
    transform: [{ scale: bellScale?.value || 1 }],
  }));

  const handleRefresh = () => {
    if (onRefresh && rotate) {
      rotate.value = withRepeat(withTiming(1, { duration: 800 }), -1, false);
      onRefresh();
      setTimeout(() => (rotate.value = withTiming(0)), 1000);
    } else if (onRefresh) {
      onRefresh();
    }
  };

  const handleBellPress = () => {
    if (onBellPress && bellScale) {
      bellScale.value = withSequence(
        withTiming(1.2, { duration: 100 }),
        withTiming(1, { duration: 100 })
      );
      onBellPress();
    } else if (onBellPress) {
      onBellPress();
    }
  };

  return (
    <View
      className="flex-row items-center justify-between px-4 py-4"
      style={{ backgroundColor: "#E21826" }}>
      <Pressable onPress={onMenuPress} className="px-2">
        <Animated.View>
          <Ionicons name="menu" size={24} color="#fff" />
        </Animated.View>
      </Pressable>

      <View className="flex-row">
        {onBellPress && (
          <Pressable onPress={handleBellPress} style={{ marginHorizontal: 8 }}>
            <Animated.View style={bellStyle}>
              <Ionicons name="notifications-outline" size={24} color="#fff" />
            </Animated.View>
            {unreadCount > 0 && (
              <View
                style={{
                  position: "absolute",
                  top: -2,
                  right: -2,
                  width: 8,
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: "white",
                }}
              />
            )}
          </Pressable>
        )}
        {onRefresh && (
          <Pressable onPress={handleRefresh} style={{ marginHorizontal: 8 }}>
            <Animated.View style={spinStyle}>
              <Ionicons name="sync-outline" size={24} color="#fff" />
            </Animated.View>
          </Pressable>
        )}
      </View>
    </View>
  );
}
