import React from "react";
import { View, Text, ActivityIndicator } from "react-native";

import NewsCard from "./NewsCard";

import { useNews } from "~/hooks/useNews";

export default function NewsCarousel() {
  const { news, loading, error } = useNews();

  if (loading) {
    return <ActivityIndicator size="large" className="my-6" />;
  }
  if (error) {
    return (
      <Text
        className="my-4 text-center text-primary-600"
        accessibilityLabel={`Error al cargar noticias: ${error}`}>
        Error al cargar noticias: {error}
      </Text>
    );
  }

  return (
    <View className="pt-6">
      <Text
        className="mb-6 px-4 text-center text-2xl font-bold text-primary-800"
        accessibilityLabel="Nuestras últimas publicaciones">
        Nuestras últimas publicaciones
      </Text>
      <View className="gap-10">
        {news.map((item) => (
          <NewsCard key={item.id} {...item} />
        ))}
      </View>
    </View>
  );
}
