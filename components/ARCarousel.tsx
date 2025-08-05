"use client";

import { AntDesign } from "@expo/vector-icons";
import React, { Dispatch, SetStateAction } from "react";
import { Image, ImageSourcePropType, View, Text, TouchableOpacity } from "react-native";

type RenderBitType = {
  title: string;
  description: string;
  uris: ImageSourcePropType[];
};

export const ARCarousel = ({
  mode,
  currentIndex,
  setCurrentIndex,
}: {
  mode: "security" | "ar";
  currentIndex: number;
  setCurrentIndex: Dispatch<SetStateAction<number>>;
}) => {
  const security: RenderBitType[] = [
    {
      title: "Verifica a contraluz",
      description:
        "Sostén el billete a contraluz. El primer semicírculo se completará perfectamente si tu billete es legal.",
      uris: [
        require("./../assets/images/ar/security/Backlight_OFF.png"),
        require("./../assets/images/ar/security/Backlight_ON.png"),
      ],
    },
    {
      title: "Cambia de color al frotar",
      description:
        "Frota el círculo rosado con tu dedo. Si tu billete es legal, verás el círculo de color desaparecer.",
      uris: [
        require("./../assets/images/ar/security/Friction_OFF.png"),
        require("./../assets/images/ar/security/Friction_ON.png"),
      ],
    },
    {
      title: "Raspa con una moneda",
      description:
        "Raspa con una moneda el último círculo. Cambiará de color si tu billete es legal.",
      uris: [
        require("./../assets/images/ar/security/Coin_OFF.png"),
        require("./../assets/images/ar/security/Coin_ON.png"),
      ],
    },
  ];

  const ar: RenderBitType[] = [
    {
      title: "Apunta tu celular al QR",
      description:
        "Sobre tu billete de lotería o fracción encontrás un código QR que podrás escanear para activar la experiencia en realidad aumentada.",
      uris: [
        require("./../assets/images/ar/tutorial/QR_OFF.png"),
        require("./../assets/images/ar/tutorial/QR_ON.png"),
      ],
    },
    {
      title: "Experimenta la Realidad Aumentada",
      description:
        "La aplicación cargará la última campaña en tu mundo, en donde podrás interactuar con ella a través de tu teléfono.",
      uris: [
        require("./../assets/images/ar/tutorial/3D_OFF.png"),
        require("./../assets/images/ar/tutorial/3D_ON.png"),
      ],
    },
  ];

  const selected = mode === "security" ? security : ar;

  return (
    <View className="flex-1 items-center justify-center">
      <View className="relative flex w-full flex-1 items-stretch justify-center gap-3 py-4">
        <View className="relative flex h-64 flex-col items-center justify-center">
          <Image
            source={selected[currentIndex].uris[0]}
            className="absolute -top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 translate-y-1/2"
          />
          <Image
            source={selected[currentIndex].uris[1]}
            className="absolute -top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 translate-y-1/2 animate-render-bit"
          />
          <View className="absolute flex w-full flex-row items-center justify-between">
            <TouchableOpacity
              onPress={() =>
                setCurrentIndex((prev) => (prev === 0 ? selected.length - 1 : prev - 1))
              }
              className="flex aspect-square h-10 flex-row items-center justify-center rounded-full bg-primary-600 p-1">
              <AntDesign name="arrowleft" size={24} color="#ffffff" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                setCurrentIndex((prev) => (prev === selected.length - 1 ? 0 : prev + 1))
              }
              className="flex aspect-square h-10 flex-row items-center justify-center rounded-full bg-primary-600 p-1">
              <AntDesign name="arrowright" size={24} color="#ffffff" />
            </TouchableOpacity>
          </View>
        </View>
        <View className="flex flex-1 flex-col items-stretch justify-center gap-2 transition-all duration-200 ease-in-out">
          <Text className="text-center text-3xl">{selected[currentIndex].title}</Text>
          <Text className="text-wrap text-center text-lg">
            {selected[currentIndex].description}
          </Text>
        </View>
        <View className="flex flex-row items-center justify-center gap-2 pb-8 pt-12">
          {selected.map((_, i) => {
            return (
              <View
                key={i}
                className={`h-3 w-3 rounded-xl bg-primary-600 transition-all duration-200 ease-in-out ${currentIndex === i ? "opacity-100" : "opacity-30"}`}
              />
            );
          })}
        </View>
      </View>
    </View>
  );
};
