import React from 'react';
import { View, Text, Image, Pressable, Linking, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function BuyTicket() {
  const handlePress = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <ScrollView className="flex-1 bg-background">
      <View className="p-4">
        
        <Text className="text-2xl font-bold text-primary-600 text-center mb-2">
          ¡Compra tu billete ahora!
        </Text>
        
        <Text className="text-lg text-on-surface text-center mb-6">
          Selecciona el portal que prefieras
        </Text>
        
        <View className="flex-row justify-around mb-8">
          <Pressable
            onPress={() => handlePress('https://www.lottive.com')}
            className="items-center"
          >
            <Image
              source={require('~/assets/logos/lottive.webp')}
              className="w-24 h-24"
              resizeMode="contain"
            />
          </Pressable>
          <Pressable
            onPress={() => handlePress('https://www.lottired.net')}
            className="items-center"
          >
            <Image
              source={require('~/assets/logos/lottireal.webp')}
              className="w-24 h-24"
              resizeMode="contain"
            />
          </Pressable>
          <Pressable
            onPress={() => handlePress('https://loti.com.co')}
            className="items-center"
          >
            <Image
              source={require('~/assets/logos/loti.webp')}
              className="w-24 h-24"
              resizeMode="contain"
            />
          </Pressable>
        </View>
        
        <View className="mb-6">
          <Text className="text-xl font-semibold text-primary-600 mb-4">
            Pasos para comprar Lotería del Valle en línea
          </Text>
          
          <View className="bg-accent-200 p-4 rounded-lg mb-4">
            <Text className="text-lg font-semibold text-primary-600 mb-2">
              Si es tu primera vez y no tienes cuenta
            </Text>
            <View className="flex-row items-center mb-2">
              <Ionicons name="ellipse" size={24} color="#bb0014" />
              <Text className="ml-2 text-base text-on-surface">
                Haz clic en crear cuenta
              </Text>
            </View>
            <View className="flex-row items-center mb-2">
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
          
          <View className="bg-accent-400 p-4 rounded-lg">
            <Text className="text-lg font-semibold text-primary-600 mb-2">
              Si ya tienes cuenta
            </Text>
            <View className="flex-row items-center mb-2">
              <Ionicons name="ellipse" size={24} color="#bb0014" />
              <Text className="ml-2 text-base text-on-surface">
                Inicia sesión
              </Text>
            </View>
            <View className="flex-row items-center mb-2">
              <Ionicons name="ellipse" size={24} color="#bb0014" />
              <Text className="ml-2 text-base text-on-surface">
                Selecciona la lotería que vas a comprar
              </Text>
            </View>
            <View className="flex-row items-center mb-2">
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