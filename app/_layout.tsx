import "~/global.css";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { Stack, useRouter } from "expo-router";
import React from "react";
import { useColorScheme } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PaperProvider } from "react-native-paper";
import NotificationOverlay from '~/components/ui/NotificationOverlay';
import { lightTheme, darkTheme } from "./theme";
import Header from "~/components/Header";
import SideMenu from "~/components/ui/SideMenu";
import { AppProvider, useAppContext } from "~/contexts/AppContext";
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function Layout() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? darkTheme : lightTheme;

  return (
    <AppProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <BottomSheetModalProvider>
          <PaperProvider theme={theme}>
            <LayoutContent />
          </PaperProvider>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </AppProvider>
  );
}

const LayoutContent: React.FC = () => {
  const {
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
  } = useAppContext();
  const router = useRouter();

  return (
    <>
      <SideMenu visible={menuOpen} onClose={() => setMenuOpen(false)} />
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="(wallet)/camera"
          options={{ headerShown: false, navigationBarHidden: true, statusBarHidden: true }}
        />
        <Stack.Screen
          name="(wallet)/new-ticket"
          options={{ headerTitle: "Nuevo billete", headerShadowVisible: false }}
        />
        <Stack.Screen
          name="(wallet)/[slug]"
          options={{
            headerTitle: "",
            headerShadowVisible: false,
          }}
        />
        <Stack.Screen name="news/[id]" options={{ headerShown: false }} />
        <Stack.Screen
          name="news/index"
          options={{
            header: () => (
              <Header
                title=""
                onMenuPress={handleMenuPress}
                onRefresh={handleRefresh}
                onBellPress={handleBellPress}
                rotate={rotate}
                bellScale={bellScale}
                refreshing={refreshing}
              />
            ),
            headerShadowVisible: false,
          }}
        />
        <Stack.Screen
          name="last-live/index"
          options={{
            header: () => (
              <Header
                title="Última retransmisión"
                onMenuPress={handleMenuPress}
                onRefresh={handleRefresh}
                onBellPress={handleBellPress}
                rotate={rotate}
                bellScale={bellScale}
                refreshing={refreshing}
              />
            ),
            headerShadowVisible: false,
          }}
        />
        <Stack.Screen
          name="prizes-plan/index"
          options={{
            header: () => (
              <Header
                title="Plan de Premios"
                onMenuPress={handleMenuPress}
                onRefresh={handleRefresh}
                onBellPress={handleBellPress}
                rotate={rotate}
                bellScale={bellScale}
                refreshing={refreshing}
              />
            ),
            headerShadowVisible: false,
          }}
        />
        <Stack.Screen name="buy-ticket/index" options={{ headerTitle: "", headerShadowVisible: true }} />
      </Stack>
      <NotificationOverlay visible={overlayVisible} onClose={() => setOverlayVisible(false)} />
    </>
  );
};