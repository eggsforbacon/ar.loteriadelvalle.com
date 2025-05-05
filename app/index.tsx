"use client";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack, Link, Href } from "expo-router";
import React, { useEffect } from "react";
import { Platform, Text, View, LogBox } from "react-native";

import { Button } from "~/components/Button";
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
  const [redirectTo, setRedirectTo] = React.useState("/onboarding");

  useEffect(() => {
    try {
      AsyncStorage.getItem("onboarded").then((value) => {
        if (value !== null && value === "true") {
          console.info("Redirecting to '/feed'");
          setRedirectTo("/feed");
        } else {
          console.info("Redirecting to '/onboarding'");
          setRedirectTo("/onboarding");
        }
      });
    } catch (error) {
      console.error(error);
      console.info("Redirecting to '/onboarding'");
      setRedirectTo("/onboarding");
    }
  }, []);

  return (
    <>
      <Stack.Screen options={{ title: "Home", headerShown: false }} />
      <Container>
        <View className={styles.container}>
          <Text
            style={{
              fontFamily: Platform.select({
                android: "Poppins_600SemiBold",
                ios: "Poppins-SemiBold",
              }),
            }}
            className={styles.title}>
            Lotería del Valle
          </Text>
          <Text
            style={{
              fontFamily: Platform.select({
                android: "Poppins_400Regular",
                ios: "Poppins-Regular",
              }),
            }}
            className={styles.copy}>
            Bienvenido a la aplicación de la lotería del Valle
          </Text>
        </View>
        <Link href={{ pathname: redirectTo } as Href} asChild>
          <Button title="Comenzar" />
        </Link>
      </Container>
    </>
  );
}

const styles = {
  container: `items-center flex-1 justify-start flex-col gap-4 pt-32`,
  separator: `h-[1px] my-7 w-4/5 bg-neutral-200`,
  title: `text-6xl text-center leading-[1.2]`,
  copy: `text-center text-lg`,
};
