import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Text, Button } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { TicketInput } from '~/components/TicketInput';
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
    <View style={styles.container}>
      <Text variant="headlineSmall" style={styles.title}>
        Consulta si tu número es ganador
      </Text>

      <View style={styles.row}>
        <TicketInput
          label="Fecha"
          iconName="calendar"
          value={ticket.date ? ticket.date.toLocaleDateString() : ''}
          onFocus={() => setShowDatePicker(true)}
        />
        <TicketInput
          label="Sorteo"
          iconName="ticket-outline"
          keyboardType="numeric"
          maxLength={4}
          value={ticket.sorteo}
          onChangeText={text =>
            handleChange('sorteo', text.replace(/[^0-9]/g, ''))
          }
        />
      </View>

      <View style={styles.row}>
        <TicketInput
          label="Número"
          iconName="numeric"
          keyboardType="numeric"
          maxLength={4}
          value={ticket.numero}
          onChangeText={text =>
            handleChange('numero', text.replace(/[^0-9]/g, ''))
          }
        />
        <TicketInput
          label="Serie"
          iconName="barcode"
          keyboardType="numeric"
          maxLength={3}
          value={ticket.serie}
          onChangeText={text =>
            handleChange('serie', text.replace(/[^0-9]/g, ''))
          }
        />
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
              const found = mockData.find(r => r.date === key);
              if (found) {
                handleChange('sorteo', found.sorteo);
              }
            }
          }}
        />
      )}

      <Button
        mode="contained"
        onPress={onConsult}
        contentStyle={styles.buttonContent}
        style={styles.consultButton}
      >
        Consultar
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  title: {
    marginBottom: 24,
    textAlign: 'center',
    color: '#BB0014',
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  buttonContent: {
    height: 48,
  },
  consultButton: {
    borderRadius: 8,
    marginTop: 8,
  },
});