"use client";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { router } from "expo-router";
import { forwardRef, MutableRefObject } from "react";
import { Pressable, Text, View } from "react-native";

import BottomSheetModalView from "~/components/bottom-sheet";
import { useBottomSheetModalStore } from "~/store/bottom-sheet";

type _Props = object;

const CameraBottomSheet = forwardRef<BottomSheetModal, _Props>((_, modalRef) => {
  const { toggleModal } = useBottomSheetModalStore();

  const handleCamera = () => {
    router.push("/(wallet)/camera");
    (modalRef as MutableRefObject<BottomSheetModal>)!.current!.close();
    toggleModal();
  };

  return (
    <BottomSheetModalView ref={modalRef}>
      <Text className="text-4xl">Agregar una foto</Text>
      <View className="flex w-full flex-col items-stretch justify-start gap-4 py-6">
        <Pressable
          className="flex w-full flex-row items-center justify-between gap-4 py-2"
          onPress={() => handleCamera()}>
          <View className="flex aspect-square items-center justify-center rounded-full bg-primary-200 p-8">
            <MaterialCommunityIcons name="camera-plus" size={28} color="#85171f" />
          </View>
          <View className="flex w-full flex-1 flex-col items-start justify-center gap-1">
            <Text className="text-2xl">Toma una foto</Text>
            <Text className="text-neutral-600">
              ¿Tienes un billete físico? Toma una foto, y agrégalo a tu billetera lotera.
            </Text>
          </View>
        </Pressable>
        <Pressable className="flex w-full flex-row items-center justify-between gap-4 py-2">
          <View className="flex aspect-square items-center justify-center rounded-full bg-accent-100 p-8">
            <MaterialIcons name="photo-library" size={28} color="#734910" />
          </View>
          <View className="flex w-full flex-1 flex-col items-start justify-center gap-1">
            <Text className="text-2xl">Sube una foto</Text>
            <Text className="text-neutral-600">
              ¿No tienes el billete a la mano? Sube una foto de tu galería.
            </Text>
          </View>
        </Pressable>
      </View>
      <Text className="text-center text-sm text-neutral-400">
        Necesitamos acceso a la cámara y a la galería para poder utilizar estas funciones. Si no has
        has aceptado estos permisos todavía, te los solicitaremos.
      </Text>
    </BottomSheetModalView>
  );
});

export default CameraBottomSheet;
