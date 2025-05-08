import React from 'react';
import Modal from 'react-native-modal';
import { Pressable, Text, View } from 'react-native';
import VideoSection from '~/components/home/live/VideoSection';

interface VideoModalProps {
  isVisible: boolean;
  onClose: () => void;
  videoData?: any;
  isLoading: boolean;
  error?: string | null;
}

const VideoModal: React.FC<VideoModalProps> = ({ isVisible, onClose, videoData, isLoading, error }) => {
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      style={{ margin: 0, justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.9)' }}
      backdropOpacity={0.5}
      animationIn="slideInUp"
      animationOut="slideOutDown"
    >
      <View className="bg-white rounded-lg p-4 max-h-[80%]">
        {isLoading ? (
          <VideoSection.Loading />
        ) : error || !videoData ? (
          <View className="items-center justify-center">
            <Text className="text-gray-700 text-center">
              {error || 'No se encontraron retransmisiones disponibles'}
            </Text>
            <Pressable onPress={onClose} className="mt-4 p-2 bg-gray-300 rounded">
              <Text className="text-white">Cerrar</Text>
            </Pressable>
          </View>
        ) : (
          <View>
            <VideoSection videoData={videoData} />
            <Pressable onPress={onClose} className="mt-4 p-2 bg-red-600 rounded items-center mx-4">
              <Text className="text-white">Cerrar</Text>
            </Pressable>
          </View>
        )}
      </View>
    </Modal>
  );
};

export default React.memo(VideoModal);