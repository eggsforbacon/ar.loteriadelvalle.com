"use client";

import { Fontisto } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useMemo } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

import { useWalletStore } from "~/store/wallet";
import { Ticket } from "~/types/wallet";

export default function TicketDetails() {
  const local = useLocalSearchParams() as { slug: string };
  const { getTicket, deleteTicket } = useWalletStore();

  const {
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

  return (
    <ScrollView
      contentContainerStyle={{ alignItems: "stretch", justifyContent: "flex-start" }}
      alwaysBounceVertical
      bounces
      contentContainerClassName="items-stretch justify-start bg-white p-4 shadow-xl gap-4 min-h-screen">
      <View className="flex flex-col items-stretch justify-start overflow-hidden rounded-3xl bg-primary-600">
        <View className="w-full flex-col items-center justify-start gap-2 px-4 pt-6">
          <Image
            source={require("~/assets/images/ticket/calendar.png")}
            className="h-8 w-8"
            resizeMode="contain"
          />
          <Text className="font-semibold text-white">{date.toLocaleDateString()}</Text>
        </View>
        <View className="relative w-full flex-col items-stretch justify-start gap-6 px-4">
          <Image
            source={require("~/assets/images/ticket/silhoutte.png")}
            className="absolute h-48 w-[95%]"
            resizeMode="contain"
            style={{
              top: "50%",
              left: "50%",
              transform: "translate(-45%, -52%)",
            }}
          />
          <View className="relative flex h-64 items-center justify-center">
            <Text className="text-center text-8xl font-black text-primary-600">
              #{ticketNumber}
            </Text>
          </View>
        </View>
        <View className="flex flex-col items-stretch justify-start gap-6 bg-primary-600 px-6 pb-10">
          <View className="w-full flex-row justify-center gap-4">
            <View className="flex-1 flex-row rounded-lg border-neutral-200 bg-white p-4">
              <Text className="text-xl text-neutral-700">Serie: </Text>
              <Text className="text-3xl font-bold text-primary-600">{series}</Text>
            </View>
            <View className="flex-1 flex-row rounded-lg border-neutral-200 bg-white p-4">
              <Text className="text-xl text-neutral-700">Sorteo: </Text>
              <Text className="text-3xl font-bold text-primary-600">{raffle}</Text>
            </View>
          </View>
          <View className="flex flex-col items-stretch justify-start gap-6 border-t border-t-white pt-6">
            <View className="w-full flex-row items-start">
              <Text className="text-5xl text-white">{fractions.length}</Text>
              <Text className="text-lg text-white/80">/3 fracciones adquiridas</Text>
            </View>
            <View className="flex flex-col items-stretch justify-start gap-6">
              {fractions.map((fraction, index) => {
                return (
                  <View key={index} className="flex flex-row items-center justify-start gap-2">
                    <Image
                      source={require("~/assets/images/ticket/fraction.png")}
                      className="h-6 w-6"
                      resizeMode="contain"
                    />
                    <Text className="text-white">Fracción {fraction}</Text>
                  </View>
                );
              })}
            </View>
            <Image
              source={require("~/assets/images/ticket/lotero-apuntando.png")}
              className="absolute -bottom-48 -right-[7rem] h-96 w-96"
              resizeMode="contain"
            />
          </View>
        </View>
      </View>
      <View className="flex flex-col gap-2">
        <TouchableOpacity
          onPress={() => handleDelete()}
          className="flex-row items-center justify-center gap-2 rounded-full bg-primary-600 p-4">
          <Fontisto name="trash" size={24} color="#fee503" />
          <Text className="text-xl text-white">Eliminar tiquete</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
