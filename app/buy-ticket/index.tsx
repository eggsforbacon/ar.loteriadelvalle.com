import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { View, Text, Image, Pressable, Linking, ScrollView } from "react-native";

export default function BuyTicket() {
  const handlePress = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <ScrollView className="flex-1 bg-background">
      <View className="p-4">
        <Text className="mb-2 text-center text-2xl font-bold text-primary-600">
          ¡Compra tu billete ahora!
        </Text>

        <Text className="mb-6 text-center text-lg text-on-surface">
          Selecciona el portal que prefieras
        </Text>

        <View className="mb-8 flex-row justify-around">
          <Pressable
            onPress={() => handlePress("https://www.lottive.com")}
            className="items-center">
            <Image
              source={require("~/assets/logos/lottive.webp")}
              className="h-24 w-24"
              resizeMode="contain"
            />
          </Pressable>
          <Pressable
            onPress={() => handlePress("https://www.lottired.net")}
            className="items-center">
            <Image
              source={require("~/assets/logos/lottireal.webp")}
              className="h-24 w-24"
              resizeMode="contain"
            />
          </Pressable>
          <Pressable onPress={() => handlePress("https://loti.com.co")} className="items-center">
            <Image
              source={require("~/assets/logos/loti.webp")}
              className="h-24 w-24"
              resizeMode="contain"
            />
          </Pressable>
        </View>

        <View className="mb-6">
          <Text className="mb-4 text-xl font-semibold text-primary-600">
            Pasos para comprar Lotería del Valle en línea
          </Text>

          <View className="mb-4 rounded-lg bg-accent-200 p-4">
            <Text className="mb-2 text-lg font-semibold text-primary-600">
              Si es tu primera vez y no tienes cuenta
            </Text>
            <View className="mb-2 flex-row items-center">
              <Ionicons name="ellipse" size={24} color="#bb0014" />
              <Text className="ml-2 text-base text-on-surface">Haz clic en crear cuenta</Text>
            </View>
            <View className="mb-2 flex-row items-center">
              <Ionicons name="ellipse" size={24} color="#bb0014" />
              <Text className="ml-2 text-base text-on-surface">
                Llena el formulario de registro
              </Text>
            </View>
            <View className="flex-row items-center">
              <Ionicons name="ellipse" size={24} color="#bb0014" />
              <Text className="ml-2 text-base text-on-surface">
                Verifica tu cuenta en tu correo electrónico
              </Text>
            </View>
          </View>

          <View className="rounded-lg bg-accent-400 p-4">
            <Text className="mb-2 text-lg font-semibold text-primary-600">Si ya tienes cuenta</Text>
            <View className="mb-2 flex-row items-center">
              <Ionicons name="ellipse" size={24} color="#bb0014" />
              <Text className="ml-2 text-base text-on-surface">Inicia sesión</Text>
            </View>
            <View className="mb-2 flex-row items-center">
              <Ionicons name="ellipse" size={24} color="#bb0014" />
              <Text className="ml-2 text-base text-on-surface">
                Selecciona la lotería que vas a comprar
              </Text>
            </View>
            <View className="mb-2 flex-row items-center">
              <Ionicons name="ellipse" size={24} color="#bb0014" />
              <Text className="ml-2 text-base text-on-surface">
                Escoge tu número de la suerte y la cantidad de fracciones que quieres comprar
              </Text>
            </View>
            <View className="flex-row items-center">
              <Ionicons name="ellipse" size={24} color="#bb0014" />
              <Text className="ml-2 text-base text-on-surface">
                Añade al carrito de compras y paga
              </Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
