'use client';

import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { router } from 'expo-router';
import { useCallback, useRef } from 'react';
import { View, Text, Pressable } from 'react-native';

import BottomSheetModalView from '~/components/bottom-sheet';
import { useBottomSheetModalStore } from '~/store/bottom-sheet';

export default function Wallet() {
  const { toggleModal } = useBottomSheetModalStore();
  const modalRef = useRef<BottomSheetModal>(null);

  const openModal = useCallback(() => {
    if (modalRef !== null) {
      modalRef.current?.present();
      modalRef.current?.expand();
      toggleModal();
      console.info('Modal toggled', modalRef.current);
    } else {
      console.error('Modal is null: ', modalRef);
    }
  }, []);

  const handleCamera = () => {
    router.push('/(wallet)/camera');
    modalRef!.current!.close();
    toggleModal();
  };

  return (
    <View className="relative flex-1 items-stretch justify-start gap-4 bg-white py-4">
      <BottomSheetModalView ref={modalRef}>
        <Text className="text-4xl">Agregar a la Billetera</Text>
        <View className="flex w-full flex-col items-stretch justify-start gap-4 py-6">
          <Pressable className="flex w-full flex-row items-center justify-between gap-4 py-2" onPress={() => handleCamera()}>
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
          Necesitamos acceso a la cámara y a la galería para poder utilizar estas funciones. Si no
          has aceptado estos permisos todavía, te los solicitaremos.
        </Text>
      </BottomSheetModalView>
      <Pressable
        className="absolute bottom-6 right-4 flex h-16 flex-row items-center justify-center gap-2 rounded-xl bg-primary-600 px-4 py-2"
        onPress={() => openModal()}>
        <FontAwesome6 name="plus" size={24} color="white" />
        <Text className="text-base font-semibold text-white">Agregar billete</Text>
      </Pressable>
    </View>
  );
}
