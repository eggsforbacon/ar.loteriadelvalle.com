import { BottomSheetModal } from "@gorhom/bottom-sheet";
import React, { forwardRef, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";

import { ARCarousel } from "~/components/ARCarousel";
import BottomSheetModalView from "~/components/bottom-sheet";

type _Props = object;

const TutorialBottomSheet = forwardRef<BottomSheetModal, _Props>((_, modalRef) => {
  const [mode, setMode] = useState<"security" | "ar">("security");
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  return (
    <BottomSheetModalView ref={modalRef} snaps={["60%", "100%"]}>
      <View className="flex flex-col items-stretch justify-start gap-4">
        <Text className="text-center text-4xl font-semibold">¿Cómo funciona?</Text>
        <Text className="text-center text-neutral-700">
          Desde esta pantalla podrás ver nuestras campañas publicitarias actuales en realidad
          aumentada. También te enseñamos como asegurarte de la legalidad de tu billete, ¡y que así
          le Juegues legal a La Salud!
        </Text>
        <View className="flex flex-col items-stretch justify-start gap-4">
          <View className="flex h-16 flex-row items-stretch justify-center rounded-full border border-primary-600">
            <TouchableOpacity
              onPress={() => {
                setCurrentIndex(0);
                setMode("security");
              }}
              className={`flex flex-1 flex-row items-center justify-center overflow-hidden rounded-l-full ${mode === "security" && "bg-primary-600"}`}>
              <Text
                className={`text-lg ${mode === "security" ? "font-bold text-white" : "text-primary-600"}`}>
                Medidas de Seguridad
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setCurrentIndex(0);
                setMode("ar");
              }}
              className={`flex flex-1 flex-row items-center justify-center overflow-hidden rounded-r-full ${mode === "ar" && "bg-primary-600"}`}>
              <Text
                className={`text-lg ${mode === "ar" ? "font-bold text-white" : "text-primary-600"}`}>
                Experiencia AR
              </Text>
            </TouchableOpacity>
          </View>
          <ARCarousel mode={mode} currentIndex={currentIndex} setCurrentIndex={setCurrentIndex} />
        </View>
      </View>
    </BottomSheetModalView>
  );
});

export default TutorialBottomSheet;
