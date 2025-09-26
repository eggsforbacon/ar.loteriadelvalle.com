"use client";

import { AntDesign, Ionicons } from "@expo/vector-icons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";
import Constants from "expo-constants";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { MultiSelect } from "react-native-element-dropdown";
import Modal from "react-native-modal";
import colors from "tailwindcss/colors";

import { Button } from "~/components/Button";
import { TextField } from "~/components/ui/TextField";
import { useWalletStore } from "~/store/wallet";
import { getResultMessage } from "~/utils/prizes"; // Importamos la lógica de verificación

// Obtenemos la URL de la API desde la configuración de Expo
const apiUrl = Constants.expoConfig?.extra?.apiUrl;

export default function NewTicket() {
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  // --- NUEVOS ESTADOS ---
  // Estado para controlar la visibilidad del modal de resultados
  const [isModalVisible, setModalVisible] = useState(false);
  // Estado para almacenar el mensaje que se mostrará en el modal
  const [modalMessage, setModalMessage] = useState("");
  // Estado para mostrar un indicador de carga mientras se verifica el billete
  const [isLoading, setIsLoading] = useState(false);
  // --- FIN DE NUEVOS ESTADOS ---

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

  // --- NUEVA LÓGICA ---
  // Esta función se ejecuta cuando el usuario cierra el modal
  const handleModalClose = () => {
    setModalVisible(false); // Ocultamos el modal
    submitNewTicket(); // Guardamos el billete en el store
    router.push("/wallet"); // Navegamos de vuelta a la billetera
  };

  // Esta es la función principal que se ejecuta al presionar "Agregar"
  const handleSubmit = async () => {
    // Validamos que los campos necesarios no estén vacíos
    if (!ticketNumber || !raffle || !series || fractions.length === 0) {
      Alert.alert("Campos incompletos", "Por favor, completa todos los datos del billete.");
      return;
    }

    setIsLoading(true); // Activamos el estado de carga

    try {
      // Hacemos la petición al backend para obtener los últimos resultados
      const response = await fetch(`${apiUrl}/api/latest-lottery-results`);
      if (!response.ok) {
        throw new Error("No se pudo conectar con el servidor de resultados.");
      }
      const draws = await response.json();

      // Creamos un objeto 'ticket' compatible con la función 'getResultMessage'
      const ticketToCheck = {
        draw: raffle,
        number: ticketNumber,
        series: series,
        date: newDate,
      };

      // Usamos la función existente para obtener el mensaje del resultado
      const msg = getResultMessage(ticketToCheck, draws);

      // Guardamos el mensaje y hacemos visible el modal
      setModalMessage(msg);
      setModalVisible(true);
    } catch (error) {
      // Si hay un error, lo mostramos en una alerta
      console.error("Error al verificar el billete:", error);
      Alert.alert(
        "Error de verificación",
        "No pudimos verificar tu billete en este momento, pero lo guardaremos en tu billetera."
      );
      // Aunque falle la verificación, permitimos guardar el billete y navegar
      submitNewTicket();
      router.push("/wallet");
    } finally {
      setIsLoading(false); // Desactivamos el estado de carga
    }
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
              setNewNumber(val.replace(/[^0-9]/g, ""));
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
              setNewRaffle(val.replace(/[^0-9]/g, ""));
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
              setNewSeries(val.replace(/[^0-9]/g, ""));
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
            onChange={(_, date) => {
              setShowDatePicker(false);
              if (date) {
                setNewDate(date);
              }
            }}
          />
        )}
      </View>
      <Button
        title={isLoading ? "Verificando..." : "Agregar"}
        onPress={handleSubmit}
        disabled={isLoading}
      />

      {/* --- NUEVO MODAL DE RESULTADOS --- */}
      <Modal isVisible={isModalVisible} onBackdropPress={handleModalClose}>
        <View className="rounded-lg bg-white p-6">
          <Text className="mb-4 text-center text-xl font-bold text-primary-800">
            Resultado de tu Billete
          </Text>
          <Text className="mb-4 text-center text-base text-neutral-700">{modalMessage}</Text>
          <View className="mt-4 rounded-md bg-yellow-100 p-3">
            <Text className="text-center text-xs text-yellow-800">
              *La presentación de billetes digitales no es una forma válida para reclamar tu
              premio. Debes presentar tu billete físico en un punto autorizado.
            </Text>
          </View>
          <View className="mt-6">
            <Button title="Entendido" onPress={handleModalClose} />
          </View>
        </View>
      </Modal>
      {/* --- FIN DE NUEVO MODAL --- */}
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
