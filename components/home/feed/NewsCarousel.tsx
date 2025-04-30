import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useNews } from '~/hooks/useNews';
import NewsCard from './NewsCard';

export default function NewsCarousel() {
  const { news, loading, error } = useNews();

  if (loading) {
    return <ActivityIndicator size="large" className="my-6" />;
  }
  if (error) {
    return (
      <Text
        className="text-brand-red text-center my-4"
        accessibilityLabel={`Error al cargar noticias: ${error}`}
      >
        Error al cargar noticias: {error}
      </Text>
    );
  }

  return (
    <View className="pt-6">
      <Text
        className="px-4 mb-6 text-2xl text-center text-brand-dark-red font-bold"
        accessibilityLabel="Nuestras últimas publicaciones"
      >
        Nuestras últimas publicaciones
      </Text>
      <View className='gap-10'>
      {news.map(item => (
        <NewsCard key={item.id} {...item} />
      ))}
      </View>
    </View>
  );
}