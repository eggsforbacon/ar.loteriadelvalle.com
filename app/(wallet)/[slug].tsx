"use client";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useMemo } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

import { useWalletStore } from "~/store/wallet";
import { Ticket } from "~/types/wallet";

export default function TicketDetails() {
  const local = useLocalSearchParams() as { slug: string };
  const { getTicket, deleteTicket, tickets } = useWalletStore();

  const {
    imageUri,
    number: ticketNumber,
    series,
    raffle,
    date,
    fractions,
  } = useMemo<Ticket>(() => getTicket(local.slug), [getTicket]);

  const handleDelete = () => {
    deleteTicket(ticketNumber);
    router.push("/wallet");
  };

  useEffect(() => {
    console.info("Tickets: ", tickets);
  }, [tickets]);

  return (
    <ScrollView
      contentContainerStyle={{ alignItems: "stretch", justifyContent: "flex-start" }}
      alwaysBounceVertical
      bounces
      contentContainerClassName="items-stretch justify-start bg-white px-4 py-6 shadow-xl gap-4">
      <View className="flex flex-col items-start justify-start gap-4 overflow-hidden rounded-2xl border border-primary-400">
        <View className="w-full flex-row justify-end border-b border-b-white/70 bg-primary-600 px-4 py-6">
          <Text className="font-semibold text-white">{date.toLocaleDateString()}</Text>
        </View>
        <View className="w-full flex-col items-stretch justify-start gap-6 px-4 ">
          <View className="relative flex h-64 items-center justify-center rounded border-2 border-dashed border-red-200">
            <Text className="text-center text-9xl font-black text-primary-600">{ticketNumber}</Text>
          </View>
        </View>
        <View className="flex flex-col items-stretch justify-start gap-6 bg-primary-600 px-4 py-10">
          <View className="w-full flex-row">
            <View className="flex-1 flex-row">
              <Text className="text-xl text-white/80">Serie: </Text>
              <Text className="text-4xl font-bold text-white">{series}</Text>
            </View>
            <View className="flex-1 flex-row justify-end">
              <Text className="text-xl text-white/80">Sorteo: </Text>
              <Text className="text-4xl font-bold text-white">{raffle}</Text>
            </View>
          </View>
          <View className="flex flex-col items-stretch justify-start gap-6">
            <View className="w-full flex-row">
              <Text className="text-4xl font-bold text-white">{fractions.length}</Text>
              <Text className="text-xl text-white/80">/3 fracciones adquiridas</Text>
            </View>
            <View className="flex flex-col items-stretch justify-start gap-6">
              {fractions.map((fraction, index) => {
                return (
                  <Text key={index} className="text-lg text-white">
                    Fracción {fraction}
                  </Text>
                );
              })}
            </View>
          </View>
        </View>
      </View>
      <View className="flex flex-col gap-2">
       {/* <TouchableOpacity
          onPress={() => handleEditFractions()}
          className="flex-row items-center justify-between rounded-2xl border-2 border-neutral-200 p-4">
          <Text className="font-semibold text-neutral-700">Editar fracciones</Text>
          <MaterialCommunityIcons name="ticket-percent-outline" size={24} color="#404040" />
        </TouchableOpacity>*/}
        <TouchableOpacity
          onPress={() => handleDelete()}
          className="flex-row items-center justify-between rounded-2xl border-2 border-primary-500 p-4">
          <Text className="font-semibold text-primary-600">Eliminar tiquete</Text>
          <MaterialCommunityIcons name="delete-outline" size={24} color="#e21826" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
