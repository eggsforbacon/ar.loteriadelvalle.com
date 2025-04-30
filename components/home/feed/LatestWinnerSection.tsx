import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { TicketContainer } from '~/components/TicketContainer';
import { mockData, Draw, Prize } from '~/data/lottery';

export default function LatestWinnerSection() {
  const router = useRouter();
  const sorted: Draw[] = [...mockData].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const latest: Draw = sorted[0];
  const mainPrize: Prize =
    latest.prizes.find((p) => p.prize === 'Premio Mayor') || latest.prizes[0];

  return (
    <TicketContainer className="mx-4 mt-4 p-4 pb-8 z-10">
      <Text className="text-base font-bold text-black text-center">
        Último número ganador
      </Text>
      <Text className="text-6xl font-bold text-brand-red text-center my-4">
        {mainPrize.number}
      </Text>
      <View className="flex-row justify-around mb-6">
        <View className="items-center">
          <Text className="font-semibold text-gray-700">Sorteo:</Text>
          <Text className="font-medium text-gray-600">{latest.draw}</Text>
        </View>
        <View className="items-center">
          <Text className="font-semibold text-gray-700">Serie:</Text>
          <Text className="font-medium text-gray-600">{mainPrize.series}</Text>
        </View>
        <View className="items-center">
          <Text className="font-semibold text-gray-700">Fecha:</Text>
          <Text className="font-medium text-gray-600">{latest.date}</Text>
        </View>
        <View className="items-center">
          <Text className="font-semibold text-gray-700">Premio:</Text>
          <Text className="font-medium text-gray-600">{mainPrize.prize}</Text>
        </View>
      </View>
      <TouchableOpacity
        className="absolute -bottom-5 self-center border-4 border-white bg-brand-red rounded-full py-2 px-6"
        onPress={() => router.push('/live')}
      >
        <Text className="text-sm font-medium text-white">Ver más</Text>
      </TouchableOpacity>
    </TicketContainer>
  );
}