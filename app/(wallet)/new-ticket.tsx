"use client";

import { Ionicons } from "@expo/vector-icons";
// import { BottomSheetModal } from "@gorhom/bottom-sheet";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, View, Text, TextInput, ScrollView, TouchableOpacity } from "react-native";
import { MultiSelect } from "react-native-element-dropdown";
import colors from "tailwindcss/colors";

import { Button } from "~/components/Button";
// import { useBottomSheetModalStore } from "~/store/bottom-sheet";
import { useWalletStore } from "~/store/wallet";

export default function NewTicket() {
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

  // const modalRef = useRef<BottomSheetModal>(null);

  const {
    newNumber: ticketNumber,
    newRaffle: raffle,
    newDate,
    newSeries: series,
    newFractions: fractions,
    tickets,
    setNewNumber,
    setNewRaffle,
    setNewDate,
    setNewSeries,
    setNewFractions,
    submitNewTicket,
  } = useWalletStore();
  // const { toggleModal } = useBottomSheetModalStore();

  /*const openModal = useCallback(() => {
    if (modalRef !== null) {
      modalRef.current?.present();
      modalRef.current?.expand();
      toggleModal();
      console.info("Modal toggled", modalRef.current);
    } else {
      console.error("Modal is null: ", modalRef);
    }
  }, []);*/

  const handleSubmit = () => {
    submitNewTicket();
    router.push("/wallet");
  };

  useEffect(() => {
    AsyncStorage.setItem("tickets", JSON.stringify(tickets)).then();
  }, [tickets]);

  return (
    <ScrollView
      contentContainerStyle={{ alignItems: "stretch", justifyContent: "space-between" }}
      contentContainerClassName="h-full flex w-full flex-col p-6 bg-white">
      {/*<CameraBottomSheet ref={modalRef} />*/}
      <View className="flex flex-col items-stretch justify-start gap-4">
        {/*{image !== "" ? (
          <Image
            source={{ uri: image }}
            style={{ width: "100%" }}
            className="h-64 rounded-xl shadow"
          />
        ) : (
          <View className=" flex h-64 w-full flex-row items-center justify-center rounded-xl border border-neutral-400">
            <TouchableOpacity
              className="flex flex-row items-center justify-between gap-4 py-2"
              onPress={() => openModal()}>
              <View className="flex aspect-square items-center justify-center rounded-full bg-neutral-200 p-8">
                <MaterialCommunityIcons name="image-plus" size={28} color="#262626" />
              </View>
            </TouchableOpacity>
          </View>
        )}*/}
        <View className="flex flex-row items-stretch justify-start gap-2">
          <View className="flex flex-1 flex-col items-stretch justify-start gap-2">
            <Text className="text-xl font-bold">Número</Text>
            <TextInput
              className="rounded-lg border border-neutral-500 px-4 py-2"
              keyboardType="numeric"
              placeholder="1234"
              maxLength={4}
              value={ticketNumber}
              onChangeText={(val) => {
                setNewNumber(val);
              }}
            />
          </View>
          <View className="flex flex-1 flex-col items-stretch justify-start gap-2">
            <Text className="text-xl font-bold">Sorteo</Text>
            <TextInput
              className="rounded-lg border border-neutral-500 px-4 py-2"
              keyboardType="numeric"
              placeholder="4783"
              maxLength={4}
              value={raffle}
              onChangeText={(val) => {
                setNewRaffle(val);
              }}
            />
          </View>
        </View>
        <View className="flex flex-row items-stretch justify-start gap-2">
          <View className="flex flex-1 flex-col items-stretch justify-start gap-2">
            <Text className="text-xl font-bold">Serie</Text>
            <TextInput
              className="rounded-lg border border-neutral-500 px-4 py-2"
              keyboardType="numeric"
              maxLength={3}
              value={series}
              placeholder="100"
              onChangeText={(val) => {
                setNewSeries(val);
              }}
            />
          </View>
          <View className="flex flex-1 flex-col items-stretch justify-start gap-2">
            <Text className="text-xl font-bold">Fecha del sorteo</Text>
            <TextInput
              className="rounded-lg border border-neutral-500 px-4 py-2"
              placeholder="4783"
              value={newDate.toLocaleDateString()}
              onFocus={() => {
                setShowDatePicker(true);
              }}
            />
          </View>
        </View>
        <View className="flex flex-row items-stretch justify-start gap-2">
          <View className="flex flex-1 flex-col items-stretch justify-start gap-2">
            <Text className="text-xl font-bold">Fracción</Text>
            <MultiSelect
              style={styles.dropdown}
              placeholderStyle={styles.placeholder}
              labelField="label"
              valueField="value"
              placeholder="¿Qué fracciones quieres agregar?"
              value={fractions}
              onChange={(selection) => {
                setNewFractions(selection);
              }}
              data={[
                { label: "Fracción 1", value: 1 },
                { label: "Fracción 2", value: 2 },
                { label: "Fracción 3", value: 3 },
              ]}
              renderItem={(item) => {
                return (
                  <View className="flex-row items-center justify-between px-4 py-2">
                    <Text className="py-4">{item.label}</Text>
                  </View>
                );
              }}
              renderSelectedItem={(item, unSelect) => (
                <TouchableOpacity onPress={() => unSelect && unSelect(item)}>
                  <View className="mb-2 mr-2 flex-row items-center justify-center gap-2 rounded border border-neutral-300 py-2 pl-4 pr-2">
                    <Text>{item.label}</Text>
                    <Ionicons color="#404040" name="remove" size={24} />
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
        {showDatePicker && (
          <DateTimePicker
            value={newDate}
            mode="date"
            display="calendar"
            onChange={(event) => {
              console.info(event);
              if (event.type === "set") {
                setNewDate(new Date(event.nativeEvent.timestamp));
              }
              setShowDatePicker(false);
            }}
          />
        )}
      </View>
      <Button title="Agregar" onPress={() => handleSubmit()} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  placeholder: {
    color: colors.neutral["600"],
  },
  item: {
    padding: 17,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dropdown: {
    height: 48,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#717171",
    padding: 12,
  },
});
