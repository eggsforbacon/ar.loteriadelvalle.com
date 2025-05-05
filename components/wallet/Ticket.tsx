import { router } from "expo-router";
import { View, Text, TouchableOpacity } from "react-native";

import { Ticket } from "~/types/wallet";

const TicketView = ({ raffle, number, fractions }: Ticket) => {
  return (
    <TouchableOpacity
      onPress={() => {
        router.push(`/(wallet)/${number}`);
      }}
      className="w-full flex-col items-stretch justify-center gap-4 rounded-3xl bg-primary-100 px-8 py-6">
      <Text className="text-3xl font-black text-primary-600">#{number}</Text>
      <View className="flex flex-row items-center justify-between">
        <Text className="text-lg text-neutral-900">Sorteo {raffle}</Text>
        <Text className="text-lg text-neutral-900">
          {fractions.length} {fractions.length !== 1 ? "fracciones" : "fracción"}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default TicketView;
