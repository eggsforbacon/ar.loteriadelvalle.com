import React from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import type { NewsItem } from '~/services/news';

const { width } = Dimensions.get('window');
const SPACING = 16;
const CARD_WIDTH = width - SPACING * 2;

export default function NewsCard({ id, title, imageUri }: NewsItem) {
  const router = useRouter();

  return (
    <View
      className="rounded-3xl bg-white mb-4 gap-6 self-center overflow-visible"
      style={{ width: CARD_WIDTH }}
    >
      <View className="rounded-3xl overflow-hidden">
        <Image
          source={{ uri: imageUri }}
          className="w-full h-48"
          resizeMode="cover"
        />
        <View className="bg-brand-red px-4 py-7 pb-10 justify-center items-center">
          <Text
            className="text-white text-base text-center font-semibold leading-6"
            numberOfLines={2}
            ellipsizeMode="tail"
            accessibilityLabel={title}
          >
            {title}
          </Text>
        </View>
      </View>
      <TouchableOpacity
        className="absolute -bottom-4 self-center border-2 border-white rounded-full py-2 px-6 bg-brand-red"
        onPress={() => router.push({ pathname: '/news/[id]', params: { id } })}
        accessibilityLabel={`Ver noticia: ${title}`}
        accessibilityRole="button"
      >
        <Text className="text-white text-sm font-medium">Ver noticia</Text>
      </TouchableOpacity>
    </View>
  );
}