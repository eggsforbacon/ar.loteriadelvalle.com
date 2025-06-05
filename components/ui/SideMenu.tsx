import { Ionicons } from "@expo/vector-icons";
import { usePathname, useRouter } from "expo-router";
import React, { useCallback, useEffect } from "react";
import { View, Pressable, Text, TouchableWithoutFeedback, Image, StyleSheet } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";

import VideoModal from "~/components/VideoModal";
import { useLastRetransmission } from "~/hooks/useLastVideo";
import { useMenuAnimation } from "~/hooks/useMenuAnimation";
import { MenuItem } from "~/types/sideMenu";

interface SideMenuProps {
  visible: boolean;
  onClose: () => void;
}

const SideMenu: React.FC<SideMenuProps> = ({ visible, onClose }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { videoData, isLoading, error } = useLastRetransmission();
  const { animateMenu, menuStyle, backdropStyle, gestureHandler } = useMenuAnimation(
    visible,
    onClose
  );

  useEffect(() => {
    animateMenu();
  }, [visible, animateMenu]);

  const menuItems: MenuItem[] = [
    {
      label: "Inicio",
      icon: "home-outline",
      onPress: () => {
        onClose();
        router.push("/feed");
      },
      path: "/feed",
    },
    {
      label: "Ver todas las noticias",
      icon: "newspaper-outline",
      onPress: () => {
        onClose();
        router.push("/news");
      },
      path: "/news",
    },
    {
      label: "Ver último sorteo en vivo",
      icon: "radio-outline",
      onPress: () => {
        if (!isLoading && videoData) {
          setIsVideoModalVisible(true);
        }
      },
      path: null,
    },
    {
      label: "Ver plan de premios",
      icon: "gift-outline",
      onPress: () => {
        onClose();
        router.push("/prizes-plan");
      },
      path: "/prizes-plan",
    },
  ];

  const [isVideoModalVisible, setIsVideoModalVisible] = React.useState(false);

  const handleCloseModal = useCallback(() => {
    setIsVideoModalVisible(false);
    onClose();
  }, [onClose]);

  const createAnimatedPressableStyle = () => {
    const scale = useSharedValue(1);

    const animatedStyle = useAnimatedStyle(() => ({
      transform: [{ scale: scale.value }],
    }));

    const onPressIn = () => {
      scale.value = withTiming(0.95, { duration: 100 });
    };

    const onPressOut = () => {
      scale.value = withTiming(1, { duration: 100 });
    };

    return { animatedStyle, onPressIn, onPressOut };
  };

  const menuItemAnimations = menuItems.map(() => createAnimatedPressableStyle());

  const checkButtonAnimation = createAnimatedPressableStyle();
  const buyButtonAnimation = createAnimatedPressableStyle();

  return (
    <View style={styles.wrapper} pointerEvents={visible ? "auto" : "none"}>
      <Animated.View style={[StyleSheet.absoluteFillObject, backdropStyle]}>
        <TouchableWithoutFeedback onPress={onClose}>
          <Animated.View style={StyleSheet.absoluteFillObject} />
        </TouchableWithoutFeedback>
      </Animated.View>

      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View className="h-full w-[80%] bg-white shadow-lg" style={menuStyle}>
          <View className="h-14 items-end justify-end pr-4">
            <Pressable onPress={onClose} className="p-2">
              <Ionicons name="close-outline" size={28} color="#333" />
            </Pressable>
          </View>

          <View className="items-center py-4">
            <Image
              source={require("~/assets/logos/LOGO-loteriadelvalle.png")}
              className="w-45 h-40"
              resizeMode="contain"
            />
          </View>

          <View className="mt-4 px-6">
            {menuItems.map((item, index) => {
              const isActive = item.path && pathname === item.path;
              const { animatedStyle, onPressIn, onPressOut } = menuItemAnimations[index];

              return (
                <Pressable
                  key={index}
                  className="py-6"
                  onPress={item.onPress}
                  onPressIn={onPressIn}
                  onPressOut={onPressOut}>
                  <Animated.View style={animatedStyle}>
                    <View className="flex-row items-center">
                      <Ionicons name={item.icon} size={24} color={isActive ? "#E21826" : "#333"} />
                      <Text
                        className={`ml-2 text-lg ${isActive ? "text-red-600" : "text-gray-700"}`}>
                        {item.label}
                      </Text>
                    </View>
                  </Animated.View>
                </Pressable>
              );
            })}
          </View>

          <View className="mt-auto p-6">
            <Pressable
              className="mb-4 items-center rounded-lg bg-yellow-500 py-4"
              onPress={() => {
                onClose();
                router.push("/(tabs)/live");
              }}
              onPressIn={checkButtonAnimation.onPressIn}
              onPressOut={checkButtonAnimation.onPressOut}>
              <Animated.View style={checkButtonAnimation.animatedStyle}>
                <Text className="text-lg font-semibold text-white">Consulta si ganaste</Text>
              </Animated.View>
            </Pressable>
            <Pressable
              className="items-center rounded-lg bg-red-600 py-4"
              onPress={() => {
                onClose();
                router.push("/buy-ticket");
              }}
              onPressIn={buyButtonAnimation.onPressIn}
              onPressOut={buyButtonAnimation.onPressOut}>
              <Animated.View style={buyButtonAnimation.animatedStyle}>
                <Text className="text-lg font-semibold text-white">Compra tu billete</Text>
              </Animated.View>
            </Pressable>
          </View>
        </Animated.View>
      </PanGestureHandler>

      <VideoModal
        isVisible={isVideoModalVisible}
        onClose={handleCloseModal}
        videoData={videoData}
        isLoading={isLoading}
        error={error}
      />
    </View>
  );
};

export default React.memo(SideMenu);

const styles = StyleSheet.create({
  wrapper: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1000,
  },
});
