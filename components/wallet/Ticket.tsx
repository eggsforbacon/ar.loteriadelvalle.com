import { router } from "expo-router";
import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";

import { Ticket } from "~/types/wallet";

const TicketView = ({ raffle, number, fractions }: Ticket) => {
  return (
    <TouchableOpacity
      onPress={() => {
        router.push(`/(wallet)/${number}`);
      }}>
      <View className="relative flex flex-col items-start justify-start gap-8 overflow-clip rounded-3xl px-8 py-4">
        <Image
          source={require("~/assets/images/ticket/item-list.png")}
          className="absolute h-96 w-[26rem]"
          resizeMode="contain"
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-42%, -46%)",
          }}
        />
        <Text className="text-4xl font-black text-accent-400">#{number}</Text>
        <View className="flex flex-row items-center justify-start gap-6">
          <Text className="text-base text-white">Sorteo {raffle}</Text>
          <Text className="text-base text-white">
            {fractions.length} {fractions.length !== 1 ? "fracciones" : "fracción"}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default TicketView;
