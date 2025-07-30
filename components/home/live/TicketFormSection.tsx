import { AntDesign } from "@expo/vector-icons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import DateTimePicker from "@react-native-community/datetimepicker";
import Constants from "expo-constants";
import React, { useState, useEffect } from "react";
import { View, Alert, Text } from "react-native";

import { Button } from "~/components/Button";
import { TextField } from "~/components/ui/TextField";
import { useTicketForm } from "~/hooks/useTicketForm";
import { Ticket } from "~/types/ticket";
import { getResultMessage } from "~/utils/prizes";

const apiUrl = Constants.expoConfig?.extra?.apiUrl;

interface Props {
  onSubmit: (ticket: Ticket) => void;
}

export default function TicketFormSection({ onSubmit }: Props) {
  const { ticket, showDatePicker, setShowDatePicker, handleChange, handleDatePicked } =
    useTicketForm();
  const [draws, setDraws] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDraws = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/latest-lottery-results`);
        if (!response.ok) {
          throw new Error("Error al obtener los resultados");
        }
        const data = await response.json();
        setDraws(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDraws();
  }, []);

  const formatDateKey = (d: Date) => d.toISOString().split("T")[0];

  const onConsult = () => {
    const msg = getResultMessage(ticket, draws);
    Alert.alert("Resultado de tu consulta", msg);
    onSubmit(ticket);
  };

  if (isLoading) {
    return <Text>Cargando...</Text>;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return (
    <View className="px-4 pt-2">
      <Text className="mb-6 text-center text-2xl font-bold text-primary-800">
        Consulta si tu número es ganador
      </Text>
      <View className="mb-4 flex-row justify-between">
        <View className="mr-2 flex-1">
          <TextField
            label="Fecha"
            value={ticket.date ? ticket.date.toLocaleDateString() : ""}
            onFocus={() => setShowDatePicker(true)}
            icon={
              <AntDesign
                name="calendar"
                size={24}
                color="#c2131f"
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              />
            }
          />
        </View>
        <View className="ml-2 flex-1">
          <TextField
            label="Sorteo"
            keyboardType="numeric"
            onChangeText={(text) => handleChange("draw", text.replace(/[^0-9]/g, ""))}
            maxLength={4}
            icon={
              <Ionicons
                name="ticket-outline"
                size={24}
                color="#c2131f"
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              />
            }
            value={ticket.draw}
          />
        </View>
      </View>

      <View className="mb-4 flex-row justify-between">
        <View className="mr-2 flex-1">
          <TextField
            label="Número"
            keyboardType="numeric"
            maxLength={4}
            icon={
              <MaterialCommunityIcons
                name="numeric"
                size={24}
                color="#c2131f"
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              />
            }
            value={ticket.number}
          />
        </View>
        <View className="ml-2 flex-1">
          <TextField
            label="Serie"
            keyboardType="numeric"
            onChangeText={(text) => handleChange("series", text.replace(/[^0-9]/g, ""))}
            maxLength={3}
            icon={
              <FontAwesome6
                name="barcode"
                size={20}
                color="#c2131f"
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              />
            }
            value={ticket.series}
          />
        </View>
      </View>

      {showDatePicker && (
        <DateTimePicker
          value={ticket.date || new Date()}
          mode="date"
          display="calendar"
          onChange={(_, date) => {
            setShowDatePicker(false);
            if (date) {
              handleDatePicked(date);
              const key = formatDateKey(date);
              const found = draws.find((r) => r.date === key);
              if (found) {
                handleChange("draw", found.draw);
              }
            }
          }}
        />
      )}

      <Button title="Consultar" onPress={onConsult} className="mt-2" />
    </View>
  );
}
