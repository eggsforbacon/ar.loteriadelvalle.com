import { useRouter } from "expo-router";
import React from "react";
import { View, Text, Image, TouchableOpacity, Dimensions } from "react-native";

import type { NewsItem } from "~/services/news";

const { width } = Dimensions.get("window");
const SPACING = 16;
const CARD_WIDTH = width - SPACING * 2;

export default function NewsCard({ id, title, imageUri }: NewsItem) {
  const router = useRouter();

  return (
    <View
      className="mb-4 gap-6 self-center overflow-visible rounded-3xl bg-white"
      style={{ width: CARD_WIDTH }}>
      <View className="overflow-hidden rounded-3xl">
        <Image source={{ uri: imageUri }} className="h-48 w-full" resizeMode="cover" />
        <View className="items-center justify-center bg-primary-600 px-4 py-7 pb-10">
          <Text
            className="text-center text-base font-semibold leading-6 text-white"
            numberOfLines={2}
            ellipsizeMode="tail"
            accessibilityLabel={title}>
            {title}
          </Text>
        </View>
      </View>
      <TouchableOpacity
        className="absolute -bottom-4 self-center rounded-full border-2 border-white bg-primary-600 px-6 py-2"
        onPress={() => router.push({ pathname: "/news/[id]", params: { id } })}
        accessibilityLabel={`Ver noticia: ${title}`}
        accessibilityRole="button">
        <Text className="text-sm font-medium text-white">Ver noticia</Text>
      </TouchableOpacity>
    </View>
  );
}
