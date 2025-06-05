import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Modal, View, Text, FlatList, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { GestureHandlerRootView, RectButton, Swipeable } from "react-native-gesture-handler";

import { useNotificationsStore } from "~/store/useNotifications";
import { Notification } from "~/types/notification";

interface Props {
  visible: boolean;
  onClose: () => void;
}

export default function NotificationOverlay({ visible, onClose }: Props) {
  const notifications = useNotificationsStore((s) => s.notifications);
  const removeNotification = useNotificationsStore((s) => s.removeNotification);
  const router = useRouter();

  const onItemPress = (item: Notification) => {
    removeNotification(item.id);
    onClose();
    router.push({ pathname: "/(tabs)/live", params: { refresh: Date.now().toString() } });
  };

  const renderRightAction = ({ item }: { item: Notification }) => (
    <RectButton style={styles.deleteBtn} onPress={() => removeNotification(item.id)}>
      <Ionicons name="trash" size={24} color="#fff" />
    </RectButton>
  );

  const renderItem = ({ item }: { item: Notification }) => (
    <Swipeable renderRightActions={() => renderRightAction({ item })} overshootRight={false}>
      <RectButton style={styles.item} onPress={() => onItemPress(item)}>
        <Text className="text-base font-semibold">{item.title}</Text>
        <Text className="mt-1 text-sm text-gray-600">{item.body}</Text>
      </RectButton>
    </Swipeable>
  );

  return (
    <Modal visible={visible} transparent animationType="fade">
      <GestureHandlerRootView style={styles.overlay}>
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={StyleSheet.absoluteFillObject} />
        </TouchableWithoutFeedback>
        <View style={styles.container}>
          <View className="flex-row items-center justify-between border-b border-gray-200 p-3">
            <RectButton onPress={onClose} style={styles.backBtn}>
              <Ionicons name="arrow-back" size={24} color="#000" />
            </RectButton>
            <Text className="text-xl font-bold">Notificaciones</Text>
            <View className="w-6" />
          </View>
          <FlatList
            data={notifications}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            ItemSeparatorComponent={() => <View className="h-px bg-gray-200" />}
            ListEmptyComponent={() => (
              <View className="items-center p-5">
                <Text className="text-gray-500">No tienes notificaciones</Text>
              </View>
            )}
          />
        </View>
      </GestureHandlerRootView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  container: {
    marginTop: 50,
    width: "90%",
    maxHeight: "80%",
    backgroundColor: "#fff",
    borderRadius: 16,
    overflow: "hidden",
  },
  backBtn: {
    padding: 8,
  },
  item: {
    padding: 12,
    backgroundColor: "#fff",
  },
  deleteBtn: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
    width: 60,
  },
});
