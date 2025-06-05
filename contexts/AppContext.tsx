import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import { useRouter } from "expo-router";
import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { Alert, Platform } from "react-native";
import Animated, {
  useSharedValue,
  withSequence,
  withTiming,
  withRepeat,
} from "react-native-reanimated";

import { useNotificationsStore } from "~/store/useNotifications";
import { useRefreshStore } from "~/store/useRefresh";

interface AppContextType {
  menuOpen: boolean;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  overlayVisible: boolean;
  setOverlayVisible: React.Dispatch<React.SetStateAction<boolean>>;
  refreshing: boolean;
  rotate: Animated.SharedValue<number>;
  bellScale: Animated.SharedValue<number>;
  handleMenuPress: () => void;
  handleRefresh: () => void;
  handleBellPress: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const rotate = useSharedValue(0);
  const bellScale = useSharedValue(1);
  const notificationListener = useRef<any>();
  const responseListener = useRef<any>();
  const router = useRouter();
  const addNotification = useNotificationsStore((s) => s.addNotification);
  const triggerRefresh = useRefreshStore((s) => s.triggerRefresh);

  useEffect(() => {
    async function registerForPushNotificationsAsync() {
      try {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== "granted") {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }
        if (finalStatus !== "granted") {
          Alert.alert("Permisos de notificación no concedidos");
          return;
        }

        const tokenData = await Notifications.getExpoPushTokenAsync();
        const token = tokenData.data;
        console.log("Expo Push Token:", token);

        const apiUrl = Constants.expoConfig?.extra?.apiUrl;
        await fetch(`${apiUrl}/register-token`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });
      } catch (error) {
        console.error("Error registrando push notifications:", error);
      }

      if (Platform.OS === "android") {
        await Notifications.setNotificationChannelAsync("default", {
          name: "default",
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: "#FF231F7C",
        });
      }
    }

    registerForPushNotificationsAsync();

    notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
      const { title, body, data } = notification.request.content;
      addNotification({
        id: Date.now().toString(),
        title: title || "",
        body: body || "",
        data,
        date: Date.now(),
      });
      console.log("Notificación recibida:", notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener((_) => {
      setOverlayVisible(false);
      const refreshParam = Date.now();
      router.push({
        pathname: "/(tabs)/live",
        params: { refresh: refreshParam },
      });
    });

    return () => {
      if (notificationListener.current)
        Notifications.removeNotificationSubscription(notificationListener.current);
      if (responseListener.current)
        Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, [addNotification, router]);

  useEffect(() => {
    if (refreshing) {
      rotate.value = withRepeat(withTiming(1, { duration: 800 }), -1, false);
    } else {
      rotate.value = withTiming(0);
    }
  }, [refreshing]);

  const handleMenuPress = () => {
    setMenuOpen((prev) => !prev);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    triggerRefresh();
    setTimeout(() => setRefreshing(false), 1000);
  };

  const handleBellPress = () => {
    bellScale.value = withSequence(
      withTiming(1.2, { duration: 100 }),
      withTiming(1, { duration: 100 })
    );
    setOverlayVisible(true);
  };

  return (
    <AppContext.Provider
      value={{
        menuOpen,
        setMenuOpen,
        overlayVisible,
        setOverlayVisible,
        refreshing,
        rotate,
        bellScale,
        handleMenuPress,
        handleRefresh,
        handleBellPress,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
