"use client";

import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useEffect } from "react";
import { View, Text, Pressable } from "react-native";

import TicketView from "~/components/wallet/Ticket";
import { useWalletStore } from "~/store/wallet";

export default function Wallet() {
  const { tickets, loadTickets } = useWalletStore();

  useEffect(() => {
    if (tickets.length === 0) {
      AsyncStorage.getItem("tickets").then((t) => {
        loadTickets(t ?? "[]");
      });
    }
  }, []);

  return (
    <View className="relative flex-1 items-stretch justify-start gap-4 bg-white py-4">
      {tickets.length === 0 ? (
        <View className="flex-1 items-center justify-center gap-2 px-16">
          <Text className="text-center text-neutral-600">
            Aquí verás tus billetes añadidos una vez los agregues a tu billetera
          </Text>
        </View>
      ) : (
        <View className="flex-1 gap-2 px-4 py-2">
          {tickets.map((t, i) => {
            return <TicketView key={i} {...t} />;
          })}
        </View>
      )}
      <Pressable
        className="absolute bottom-6 right-4 flex h-16 flex-row items-center justify-center gap-2 rounded-xl bg-primary-600 px-4 py-2"
        onPress={() => router.push("/(wallet)/new-ticket")}>
        <FontAwesome6 name="plus" size={24} color="white" />
        <Text className="text-base font-semibold text-white">Agregar billete</Text>
      </Pressable>
    </View>
  );
}
