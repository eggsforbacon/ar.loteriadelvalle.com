import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, SafeAreaView, Pressable } from 'react-native';
import { NewsItem } from '~/services/news';
import NewsCard from '~/components/home/feed/NewsCard';
import { fetchAllNews } from '~/services/news';
import { useRefreshStore } from '~/store/useRefresh';
import { router } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function AllNews() {
  const refreshKey = useRefreshStore((s) => s.refreshKey);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadNews = async (reset = false) => {
    if (loading || (!reset && !hasMore)) return;
    setLoading(true);
    try {
      const currentPage = reset ? 1 : page;
      const newNews = await fetchAllNews(currentPage);
      if (newNews.length < 4) setHasMore(false);
      if (reset) {
        setNews(newNews);
        setPage(2);
        setHasMore(true);
      } else {
        setNews((prev) => [...prev, ...newNews]);
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      console.error('Error loading news:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNews(true);
  }, []);

  useEffect(() => {
    loadNews(true);
  }, [refreshKey]);

  return (
    <SafeAreaView className="flex-1 bg-white px-4 py-6">
      <View className="flex-row items-center justify-between mb-10">
        <Pressable onPress={() => router.back()} >
          <Ionicons name="arrow-back" size={24} color="#1F2937" />
        </Pressable>
        <Text className="text-center text-2xl font-bold text-primary-800 flex-1">
          Todas nuestras noticias
        </Text>
      </View>
      <FlatList
        data={news}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="mb-10">
            <NewsCard {...item} />
          </View>
        )}
        onEndReached={() => loadNews(false)}
        onEndReachedThreshold={0.5}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={loading ? <ActivityIndicator size="large" /> : null}
      />
    </SafeAreaView>
  );
}