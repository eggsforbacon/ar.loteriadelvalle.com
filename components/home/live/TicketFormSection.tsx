import React from 'react';
import { View, Alert, Text } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ticket } from '~/types/ticket';
import { useTicketForm } from '~/hooks/useTicketForm';
import { mockData } from '~/data/lottery';
import { getResultMessage } from '~/utils/prizes';

interface Props {
  onSubmit: (ticket: Ticket) => void;
}

export default function TicketFormSection({ onSubmit }: Props) {
  const {
    ticket,
    showDatePicker,
    setShowDatePicker,
    handleChange,
    handleDatePicked,
  } = useTicketForm();

  const formatDateKey = (d: Date) => d.toISOString().split('T')[0];

  const onConsult = () => {
    const msg = getResultMessage(ticket, mockData);
    Alert.alert('Resultado de tu consulta', msg);
    onSubmit(ticket);
  };

  return (
    <View className="px-4 pt-2">
      <Text className="text-2xl font-bold text-brand-dark-red text-center mb-6">
        Consulta si tu número es ganador
      </Text>

      <View className="flex-row justify-between mb-4">
        <View className="flex-1 mr-2">
          <TextInput
            mode="outlined"
            label="Fecha"
            value={ticket.date ? ticket.date.toLocaleDateString() : ''}
            onFocus={() => setShowDatePicker(true)}
            left={<TextInput.Icon icon="calendar" color="#BB0014" />}
            className="text-base"
            outlineStyle={{ borderColor: '#BB0014', borderWidth: 1, borderRadius: 8 }}
          />
        </View>
        <View className="flex-1 ml-2">
          <TextInput
            mode="outlined"
            label="Sorteo"
            keyboardType="numeric"
            maxLength={4}
            value={ticket.draw}
            onChangeText={(text) =>
              handleChange('draw', text.replace(/[^0-9]/g, ''))
            }
            left={<TextInput.Icon icon="ticket-outline" color="#BB0014" />}
            className="text-base"
            outlineStyle={{ borderColor: '#BB0014', borderWidth: 1, borderRadius: 8 }}
          />
        </View>
      </View>

      <View className="flex-row justify-between mb-4">
        <View className="flex-1 mr-2">
          <TextInput
            mode="outlined"
            label="Número"
            keyboardType="numeric"
            maxLength={4}
            value={ticket.number}
            onChangeText={(text) =>
              handleChange('number', text.replace(/[^0-9]/g, ''))
            }
            left={<TextInput.Icon icon="numeric" color="#BB0014" />}
            className="text-base"
            outlineStyle={{ borderColor: '#BB0014', borderWidth: 1, borderRadius: 8 }}
          />
        </View>
        <View className="flex-1 ml-2">
          <TextInput
            mode="outlined"
            label="Serie"
            keyboardType="numeric"
            maxLength={3}
            value={ticket.series}
            onChangeText={(text) =>
              handleChange('series', text.replace(/[^0-9]/g, ''))
            }
            left={<TextInput.Icon icon="barcode" color="#BB0014" />}
            className="text-base"
            outlineStyle={{ borderColor: '#BB0014', borderWidth: 1, borderRadius: 8 }}
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
              const found = mockData.find((r) => r.date === key);
              if (found) {
                handleChange('draw', found.draw);
              }
            }
          }}
        />
      )}

      <Button
        mode="contained"
        onPress={onConsult}
        className="bg-brand-red mt-2 py-1"
        style={{borderRadius:8}}
      >
        Consultar
      </Button>
    </View>
  );
}