import React from 'react';
import { SafeAreaView, ScrollView, View, Text, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import RenderHTML, { CustomRendererProps, TBlock } from 'react-native-render-html';
import { useNewsDetail } from '~/hooks/useNewsDetail';
import Video from 'react-native-video';
import { HTMLElementModel, HTMLContentModel } from 'react-native-render-html';

const { width } = Dimensions.get('window');

const customHTMLElementModels = {
  video: HTMLElementModel.fromCustomModel({
    tagName: 'video',
    contentModel: HTMLContentModel.block,
  }),
};

const VideoRenderer: React.FC<CustomRendererProps<TBlock>> = ({ tnode }) => {
  const source = tnode.attributes.src;
  if (!source) {
    return null;
  }

  return (
    <View
      className="aspect-[16/9] rounded-xl overflow-hidden bg-black my-2"
      style={{ width: width - 32 }}
    >
      <Video
        source={{ uri: source }}
        className="w-full h-full"
        style={{ width: '100%', height: '100%' }}
        controls={true}
        resizeMode="contain"
        repeat={false}
        paused
      />
    </View>
  );
};

export default function NewsDetail() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { post, loading, error } = useNewsDetail(id);

  if (loading) return <ActivityIndicator size="large" className="my-6" />;
  if (error || !post) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center">
        <Text accessibilityLabel="Noticia no encontrada">Noticia no encontrada.</Text>
        <TouchableOpacity
          className="flex-row items-center mt-4"
          onPress={() => router.back()}
          accessibilityLabel="Volver atrás"
          accessibilityRole="button"
        >
          <FontAwesome6 name="arrow-left" size={20} color="#E21826" />
          <Text className="ml-2 text-base text-brand-red">Volver</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView className="flex-1 bg-white">
        <ScrollView contentContainerClassName="pb-8">
          <TouchableOpacity
            className="m-4 self-start"
            onPress={() => router.back()}
            accessibilityLabel="Volver atrás"
            accessibilityRole="button"
          >
            <FontAwesome6 name="arrow-left" size={24} color="#E21826" />
          </TouchableOpacity>
          <View className="p-4">
            <RenderHTML
              contentWidth={width - 32}
              source={{ html: post.contentHtml }}
              customHTMLElementModels={customHTMLElementModels}
              renderers={{ video: VideoRenderer }}
              tagsStyles={{
                h1: { color: '#BB0014' },
                h2: { color: '#BB0014' },
                strong: { fontWeight: 'bold' },
                p: { marginHorizontal: 0 },
                figure: { marginHorizontal: 0 },
              }}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}