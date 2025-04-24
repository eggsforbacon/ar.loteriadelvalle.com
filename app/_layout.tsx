import '~/global.css';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import { Stack, useRouter } from 'expo-router';
import { useState, useEffect, useRef } from 'react';
import { Platform, Alert, useColorScheme } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PaperProvider } from 'react-native-paper';

import { lightTheme, darkTheme } from './theme';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function Layout() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;
  const [expoPushToken, setExpoPushToken] = useState<string | null>(null);
  const notificationListener = useRef<any>();
  const responseListener = useRef<any>();
  const router = useRouter();

  useEffect(() => {
    async function registerForPushNotificationsAsync() {
      try {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }
        if (finalStatus !== 'granted') {
          Alert.alert('Permisos de notificación no concedidos');
          return;
        }

        const tokenData = await Notifications.getExpoPushTokenAsync();
        const token = tokenData.data;
        console.log('Expo Push Token:', token);
        setExpoPushToken(token);

        const apiUrl = Constants.expoConfig?.extra?.apiUrl;
        await fetch(`${apiUrl}/register-token`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token }),
        });
      } catch (error) {
        console.error('Error registrando push notifications:', error);
      }

      if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#FF231F7C',
        });
      }
    }

    registerForPushNotificationsAsync();

    notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
      console.log('Notificación recibida:', notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
      console.log('Respuesta a notificación:', response);
      router.push('/(tabs)/live');
    });

    return () => {
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(notificationListener.current);
      }
      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
  }, []);

  return (
    <GestureHandlerRootView>
      <BottomSheetModalProvider>
        <PaperProvider theme={theme}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen
              name="(wallet)/camera"
              options={{ headerShown: false, navigationBarHidden: true, statusBarHidden: true }}
            />
          </Stack>
        </PaperProvider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}
