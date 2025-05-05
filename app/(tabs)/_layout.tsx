"use client";

import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { requestCameraPermissionsAsync } from "expo-image-picker";
import { Tabs } from "expo-router";
import { useEffect } from "react";

export default function _layout() {
  useEffect(() => {
    try {
      AsyncStorage.getItem("onboarded").then((value) => {
        if (value === null || value !== "true") {
          AsyncStorage.setItem("onboarded", JSON.stringify(true)).then();
        }
      });
    } catch (error) {
      console.error(error);
      console.info(`Unable to read or set onboarded value: ${error}`);
    }
  }, []);

  useEffect(() => {
    requestCameraPermissionsAsync().then();
  }, []);

  return (
    <Tabs
      screenOptions={{
        headerShadowVisible: false,
        tabBarActiveTintColor: "#E21826",
      }}>
      <Tabs.Screen
        name="feed"
        options={{
          tabBarIcon: ({ color }) => <FontAwesome6 name="newspaper" size={24} color={color} />,
          tabBarLabel: "Feed",
          headerTitle: "Feed",
        }}
      />
      <Tabs.Screen
        name="scan"
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="cube-scan" size={24} color={color} />
          ),
          tabBarLabel: "Escanear",
          headerTitle: "Escanear",
        }}
      />
      <Tabs.Screen
        name="wallet"
        options={{
          tabBarIcon: ({ color }) => <MaterialIcons name="wallet" size={24} color={color} />,
          tabBarLabel: "Billetera",
          headerTitle: "Billetera",
        }}
      />
      <Tabs.Screen
        name="live"
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="broadcast" size={24} color={color} />
          ),
          tabBarLabel: "En Vivo",
          headerTitle: "En Vivo",
        }}
      />
    </Tabs>
  );
}
