"use client";

import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Tabs } from "expo-router";
import React, { useEffect } from "react";

import Header from "~/components/Header";
import { useAppContext } from "~/contexts/AppContext";
import { useRefreshStore } from "~/store/useRefresh";

export default function TabsLayout() {
  const refreshKey = useRefreshStore((s) => s.refreshKey);
  const { refreshing, rotate, bellScale, handleMenuPress, handleRefresh, handleBellPress } =
    useAppContext();

  useEffect(() => {
    AsyncStorage.getItem("onboarded").then((value) => {
      if (value !== "true") AsyncStorage.setItem("onboarded", "true");
    });
  }, []);

  return (
    <Tabs
      key={refreshKey}
      screenOptions={{
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
        headerTintColor: "#fff",
        tabBarActiveTintColor: "#E21826",
      }}>
      <Tabs.Screen
        name="feed"
        options={{
          tabBarIcon: ({ color }) => <FontAwesome6 name="newspaper" size={24} color={color} />,
          tabBarLabel: "Feed",
        }}
      />
      <Tabs.Screen
        name="scan"
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="cube-scan" size={24} color={color} />
          ),
          tabBarLabel: "Escanear",
        }}
      />
      <Tabs.Screen
        name="wallet"
        options={{
          tabBarIcon: ({ color }) => <MaterialIcons name="wallet" size={24} color={color} />,
          tabBarLabel: "Billetera",
        }}
      />
      <Tabs.Screen
        name="live"
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="broadcast" size={24} color={color} />
          ),
          tabBarLabel: "En Vivo",
        }}
      />
    </Tabs>
  );
}
