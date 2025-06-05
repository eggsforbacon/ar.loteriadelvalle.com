import React from "react";
import { Pressable, Text, View } from "react-native";
import Modal from "react-native-modal";

import VideoSection from "~/components/home/live/VideoSection";

interface VideoModalProps {
  isVisible: boolean;
  onClose: () => void;
  videoData?: any;
  isLoading: boolean;
  error?: string | null;
}

const VideoModal: React.FC<VideoModalProps> = ({
  isVisible,
  onClose,
  videoData,
  isLoading,
  error,
}) => {
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      style={{ margin: 0, justifyContent: "center", backgroundColor: "rgba(0,0,0,0.9)" }}
      backdropOpacity={0.5}
      animationIn="slideInUp"
      animationOut="slideOutDown">
      <View className="max-h-[80%] rounded-lg bg-white p-4">
        {isLoading ? (
          <VideoSection.Loading />
        ) : error || !videoData ? (
          <View className="items-center justify-center">
            <Text className="text-center text-gray-700">
              {error || "No se encontraron retransmisiones disponibles"}
            </Text>
            <Pressable onPress={onClose} className="mt-4 rounded bg-gray-300 p-2">
              <Text className="text-white">Cerrar</Text>
            </Pressable>
          </View>
        ) : (
          <View>
            <VideoSection videoData={videoData} />
            <Pressable onPress={onClose} className="mx-4 mt-4 items-center rounded bg-red-600 p-2">
              <Text className="text-white">Cerrar</Text>
            </Pressable>
          </View>
        )}
      </View>
    </Modal>
  );
};

export default React.memo(VideoModal);
