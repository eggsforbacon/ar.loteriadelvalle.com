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
          className="absolute top-36 w-full h-full"
          resizeMode="contain"
        />

        <View className="flex-1 justify-between items-center">
          <View className="w-full items-center mt-8">
            <Image
              source={require("../assets/logos/LOGO-gobernacion2.png")}
              className="w-4/5 h-20"
              resizeMode="contain"
            />
            <Image
              source={require("../assets/logos/LOGO-loteriadelvalle.png")}
              className="w-4/5 h-40 mt-4"
              resizeMode="contain"
            />
          </View>

          <View className="flex-1" />

          <View className="w-full">
            <View className="w-full items-center relative">
              <TouchableOpacity
                onPress={handleStart}
                className="bg-red-600 w-5/6 h-32 rounded-xl p-4 z-10 absolute bottom-12 rounded-b-none justify-center"
              >
                <Text
                  className="text-white text-4xl text-center"
                  style={{ fontFamily: "Poppins_700Bold" }}
                >
                  Bienvenido
                </Text>
                <Text
                  className="text-white text-2xl text-center mx-10"
                  style={{ fontFamily: "Poppins_700Bold" }}
                >
                  a la aplicación de la lotería del Valle
                </Text>
              </TouchableOpacity>
              <View className="bg-yellow-400 w-full h-12 absolute bottom-0" />
            </View>
          </View>
        </View>
      </Container>
    </>
  );
}