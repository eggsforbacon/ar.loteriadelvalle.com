"use client";

import { AntDesign, Ionicons } from "@expo/vector-icons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from "react-native";
import { MultiSelect } from "react-native-element-dropdown";
import colors from "tailwindcss/colors";

import { Button } from "~/components/Button";
import { TextField } from "~/components/ui/TextField";
import { useWalletStore } from "~/store/wallet";

export default function NewTicket() {
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

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
      <View className="flex flex-col items-stretch justify-start gap-8 rounded-xl bg-primary-600 px-6 py-4">
        <Text className="text-xl font-bold text-accent-400">Datos del billete</Text>
        <View className="flex flex-row items-stretch justify-start gap-2">
          <TextField
            label="Número"
            keyboardType="numeric"
            maxLength={4}
            value={ticketNumber}
            onChangeText={(val) => {
              setNewNumber(val);
            }}
            icon={
              <MaterialCommunityIcons
                name="numeric"
                size={24}
                color="#737373"
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              />
            }
          />
        </View>
        <View className="flex flex-row items-stretch justify-start gap-2">
          <TextField
            label="Sorteo"
            keyboardType="numeric"
            maxLength={4}
            value={raffle}
            onChangeText={(val) => {
              setNewRaffle(val);
            }}
            icon={
              <Ionicons
                name="ticket-outline"
                size={24}
                color="#737373"
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              />
            }
          />
        </View>
        <View className="flex flex-row items-stretch justify-start gap-2">
          <TextField
            label="Serie"
            keyboardType="numeric"
            maxLength={3}
            value={series}
            onChangeText={(val) => {
              setNewSeries(val);
            }}
            icon={
              <FontAwesome6
                name="barcode"
                size={20}
                color="#737373"
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              />
            }
          />
        </View>
        <View className="flex flex-row items-stretch justify-start gap-2">
          <TextField
            label="Fecha"
            value={newDate.toLocaleDateString()}
            onFocus={() => {
              setShowDatePicker(true);
            }}
            icon={
              <AntDesign
                name="calendar"
                size={24}
                color="#737373"
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              />
            }
          />
        </View>
        <View className="flex flex-row items-stretch justify-start gap-2">
          <View className="flex flex-1 flex-col items-stretch justify-start gap-2">
            <Text className="text-xl font-bold text-accent-400">Fracciones</Text>
            <MultiSelect
              style={styles.dropdown}
              placeholderStyle={styles.placeholder}
              labelField="label"
              valueField="value"
              placeholder="Selecciona al menos una opción"
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
                  <View className="mb-2 mr-2 flex-row items-center justify-center gap-2 rounded border border-neutral-600 bg-white py-2 pl-4 pr-2">
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
    backgroundColor: "white",
    borderColor: "#737373",
    padding: 12,
  },
});
