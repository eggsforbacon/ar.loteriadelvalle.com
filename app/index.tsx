"use client";

import { Stack, useRouter } from "expo-router";
import { Text, View, Image, LogBox, TouchableOpacity } from "react-native";

import { Container } from "~/components/Container";

LogBox.ignoreLogs([
  "TRenderEngineProvider: Support for defaultProps",
  "MemoizedTNodeRenderer: Support for defaultProps",
  "TNodeChildrenRenderer: Support for defaultProps",
  "IMGElement: Support for defaultProps",
]);

const originalConsoleError = console.error;
console.error = (...args: any[]) => {
  const msg = args[0]?.toString?.() || "";
  if (
    msg.includes("Support for defaultProps") ||
    msg.includes("TRenderEngineProvider") ||
    msg.includes("MemoizedTNodeRenderer") ||
    msg.includes("TNodeChildrenRenderer") ||
    msg.includes("IMGElement")
  ) {
    return;
  }
  originalConsoleError(...args);
};

export default function Home() {
  const router = useRouter();
  const handleStart = () => {
    router.push("/onboarding");
  };

  return (
    <>
      <Stack.Screen options={{ title: "Home", headerShown: false }} />
      <Container fullScreen>
        <Image
          source={require("../assets/images/home/background.png")}
          className="absolute top-36 h-full w-full"
          resizeMode="contain"
        />

        <View className="flex-1 items-center justify-between">
          <View className="mt-8 w-full items-center">
            <Image
              source={require("../assets/logos/logos_loteria_all.png")}
              className="h-52 w-4/5"
              resizeMode="contain"
            />
          </View>

          <View className="flex-1" />

          <View className="w-full">
            <View className="relative w-full items-center">
              <TouchableOpacity
                onPress={handleStart}
                className="absolute bottom-28 z-10 h-24 w-5/6 justify-center rounded-xl bg-red-600 p-4">
                <Text
                  className="text-center text-2xl text-white"
                  style={{ fontFamily: "Poppins_700Bold" }}>
                  Te damos la bienvenida
                </Text>
                <Text
                  className="text-center text-xl text-white"
                  style={{ fontFamily: "Poppins_700Bold" }}>
                  Presiona aquí para ingresar
                </Text>
              </TouchableOpacity>
              <View className="absolute bottom-0 h-12 w-full bg-red-600" />
            </View>
          </View>
        </View>
      </Container>
    </>
  );
}
