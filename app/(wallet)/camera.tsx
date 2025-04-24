'use client';

import { AntDesign } from '@expo/vector-icons';
import { CameraView } from 'expo-camera';
import { router } from 'expo-router';
import { useRef } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export default function WalletCamera() {
  const cameraRef = useRef<CameraView>(null);

  return (
    <View className="flex flex-1 flex-col items-stretch justify-between">
      <View className="flex h-16 flex-row items-center justify-start bg-black px-6 py-2">
        <TouchableOpacity onPress={() => router.back()}>
          <AntDesign name="close" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <View className="flex-1 items-center justify-center bg-red-400">
        <CameraView style={{ flex: 1, width: '100%' }} facing="front" flash="off" ref={cameraRef}>
          <View className="flex flex-1 flex-col items-stretch justify-between">
            <Text> </Text>
          </View>
        </CameraView>
      </View>
      <View className="flex h-44 flex-row items-start justify-center bg-black px-6 py-6">
        <TouchableOpacity
          className="flex aspect-square h-20 w-20 items-stretch justify-center rounded-full border-4 border-white p-1"
          onPress={() => router.back()}>
          <View className="h-full w-full rounded-full bg-white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
