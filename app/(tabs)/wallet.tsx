'use client';

import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useState } from 'react';
import { View, Text, Pressable } from 'react-native';

export default function Wallet() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();

  return (
    <View className="relative flex-1 items-stretch justify-start gap-4 bg-white px-4 py-4">
      <Text>Billetera</Text>
      <Pressable className="absolute bottom-6 right-4 flex h-16 flex-row items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-2">
        <FontAwesome6 name="plus" size={24} color="white" />
        <Text className="text-base font-semibold text-white">Agregar billete</Text>
      </Pressable>
    </View>
  );
}
