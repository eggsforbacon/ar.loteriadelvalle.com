"use client";

import { AntDesign } from "@expo/vector-icons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { CameraView } from "expo-camera";
import { router } from "expo-router";
import { useRef, useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";

import { useWalletStore } from "~/store/wallet";

export default function WalletCamera() {
  const [image, setImage] = useState<string | null>(null);
  const [flash, setFlash] = useState<boolean>(false);
  const cameraRef = useRef<CameraView>(null);

  const { setNewImageUrl } = useWalletStore();

  const takePicture = async () => {
    if (cameraRef && cameraRef.current) {
      try {
        const data = await cameraRef.current.takePictureAsync();
        setImage(data!.uri);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <View className="flex flex-1 flex-col items-stretch justify-between">
      <View className="flex h-16 flex-row items-center justify-between bg-black px-6 py-2">
        {!image ? (
          <View className="flex flex-1 flex-row items-center justify-between">
            <TouchableOpacity
              onPress={() => router.back()}
              className="flex flex-row items-center justify-start">
              <AntDesign name="close" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setFlash(!flash)}
              className="flex flex-row items-center justify-start">
              <MaterialIcons name={flash ? "flash-on" : "flash-off"} size={24} color="white" />
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            onPress={() => setImage(null)}
            className="flex w-full flex-row items-center justify-start">
            <MaterialCommunityIcons name="camera-retake" size={24} color="white" />
          </TouchableOpacity>
        )}
      </View>
      <View className="flex-1 items-center justify-center bg-red-400">
        {!image ? (
          <CameraView
            style={{ flex: 1, width: "100%" }}
            facing="back"
            flash={flash ? "on" : "off"}
            ref={cameraRef}>
            <View className="flex flex-1 flex-col items-stretch justify-between">
              <Text> </Text>
            </View>
          </CameraView>
        ) : (
          <Image source={{ uri: image }} style={{ flex: 1, width: "100%" }} />
        )}
      </View>
      <View className="flex h-44 flex-row items-start justify-center bg-black px-6 py-6">
        {!image ? (
          <TouchableOpacity
            className="flex aspect-square h-20 w-20 items-stretch justify-center rounded-full border-4 border-white p-1"
            onPress={() => takePicture()}>
            <View className="h-full w-full rounded-full bg-white" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            className="font-poppins flex flex-row items-center rounded-full bg-primary-500 px-12 py-4"
            onPress={() => {
              setNewImageUrl(image);
              router.push("/(wallet)/new-ticket");
              setImage(null);
            }}>
            <Text className="text-xl font-semibold text-white">Confirmar</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
