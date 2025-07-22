import { useRouter } from "expo-router";
import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { TicketContainer } from "~/components/TicketContainer";
import Constants from "expo-constants";

interface Prize {
  prize: string;
  number: string;
  series: string;
}

interface Draw {
  draw: string;
  date: string;
  prizes: Prize[];
}

export default function LatestWinnerSection() {
  const router = useRouter();
  const [latestDraw, setLatestDraw] = useState<Draw | null>(null);

  useEffect(() => {
    const fetchLatestDraw = async () => {
      try {
        const apiUrl = Constants.expoConfig?.extra?.apiUrl;
        const response = await fetch(`${apiUrl}/api/last-draw`);
        if (!response.ok) {
          throw new Error("Error en la solicitud a la API");
        }
        const data: Draw = await response.json();
        setLatestDraw(data);
      } catch (error) {
        console.error("Error al obtener el último sorteo:", error);
      }
    };

    fetchLatestDraw();
  }, []);

  if (!latestDraw) {
    return (
        <Text className="text-center text-base font-bold text-black">Cargando...</Text>
    );
  }

  const mainPrize: Prize = latestDraw.prizes.find((p) => p.prize === "Premio Mayor") || latestDraw.prizes[0];

  return (
    <TicketContainer className="z-10 mx-4 mt-8 p-4 pb-8">
      <Text className="text-center text-base font-bold text-black">Último número ganador</Text>
      <Text className="my-4 text-center text-6xl font-bold text-primary-600">
        {mainPrize.number}
      </Text>
      <View className="mb-6 flex-row justify-around">
        <View className="items-center">
          <Text className="font-semibold text-neutral-700">Sorteo:</Text>
          <Text className="font-medium text-neutral-600">{latestDraw.draw}</Text>
        </View>
        <View className="items-center">
          <Text className="font-semibold text-neutral-700">Serie:</Text>
          <Text className="font-medium text-neutral-600">{mainPrize.series}</Text>
        </View>
        <View className="items-center">
          <Text className="font-semibold text-neutral-700">Fecha:</Text>
          <Text className="font-medium text-neutral-600">{latestDraw.date}</Text>
        </View>
        <View className="items-center">
          <Text className="font-semibold text-neutral-700">Premio:</Text>
          <Text className="font-medium text-neutral-600">{mainPrize.prize}</Text>
        </View>
      </View>
      <TouchableOpacity
        className="absolute -bottom-5 self-center rounded-full border-4 border-white bg-primary-600 px-6 py-2"
        onPress={() => router.push("/live")}>
        <Text className="text-sm font-medium text-white">Ver más</Text>
      </TouchableOpacity>
    </TicketContainer>
  );
}