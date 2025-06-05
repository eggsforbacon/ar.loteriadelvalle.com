import { useCallback } from "react";
import { PanGestureHandlerGestureEvent } from "react-native-gesture-handler";
import {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  useAnimatedGestureHandler,
  runOnJS,
} from "react-native-reanimated";

import { MENU_WIDTH } from "~/types/sideMenu";

export const useMenuAnimation = (visible: boolean, onClose: () => void) => {
  const translateX = useSharedValue(-MENU_WIDTH);
  const backdropOpacity = useSharedValue(0);

  const animateMenu = useCallback(() => {
    translateX.value = withTiming(visible ? 0 : -MENU_WIDTH, { duration: 300 });
    backdropOpacity.value = withTiming(visible ? 0.5 : 0, { duration: 300 });
  }, [visible]);

  const gestureHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    { startX: number }
  >({
    onStart: (_, ctx) => {
      ctx.startX = translateX.value;
    },
    onActive: (event, ctx) => {
      translateX.value = Math.min(Math.max(ctx.startX + event.translationX, -MENU_WIDTH), 0.5);
    },
    onEnd: (event) => {
      if (event.translationX < -150) {
        translateX.value = withTiming(-MENU_WIDTH, { duration: 300 }, () => runOnJS(onClose)());
        backdropOpacity.value = withTiming(0, { duration: 300 });
      } else {
        translateX.value = withTiming(0, { duration: 300 });
      }
    },
  });

  const menuStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const backdropStyle = useAnimatedStyle(() => ({
    backgroundColor: `rgba(0,0,0,${backdropOpacity.value})`,
  }));

  return { animateMenu, menuStyle, backdropStyle, gestureHandler };
};
