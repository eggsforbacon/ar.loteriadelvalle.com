import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { DataTable, Button, Text } from 'react-native-paper';
import { mockData } from '~/data/lottery';

const ResultsTable = () => {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [page, setPage] = useState(0);
  const itemsPerPage = 4;
  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, mockData.length);
  const totalPages = Math.ceil(mockData.length / itemsPerPage);

  return (
    <View style={styles.container}>
      <Text variant="headlineSmall" style={styles.title}>
        Histórico de resultados
      </Text>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Sorteo</DataTable.Title>
          <DataTable.Title>Fecha</DataTable.Title>
          <DataTable.Title numeric>Detalles</DataTable.Title>
        </DataTable.Header>

        {mockData.slice(from, to).map((row) => (
          <React.Fragment key={row.id}>
            <DataTable.Row>
              <DataTable.Cell>{row.sorteo}</DataTable.Cell>
              <DataTable.Cell>{row.date}</DataTable.Cell>
              <DataTable.Cell numeric>
                <Button
                  compact
                  onPress={() =>
                    setExpandedId(expandedId === row.id ? null : row.id)
                  }
                >
                  {expandedId === row.id ? 'Ocultar' : 'Mostrar'}
                </Button>
              </DataTable.Cell>
            </DataTable.Row>

            {expandedId === row.id && (
              <View style={styles.subTable}>
                <DataTable>
                  <DataTable.Header>
                    <DataTable.Title style={{ flex: 1 }}>Número</DataTable.Title>
                    <DataTable.Title style={{ flex: 1 }}>Serie</DataTable.Title>
                    <DataTable.Title style={{ flex: 2 }}>Premio</DataTable.Title>
                  </DataTable.Header>
                  {row.premios.map((premio, idx) => (
                    <DataTable.Row key={idx}>
                      <DataTable.Cell style={{ flex: 1 }}>{premio.numero}</DataTable.Cell>
                      <DataTable.Cell style={{ flex: 1 }}>{premio.serie}</DataTable.Cell>
                      <DataTable.Cell style={{ flex: 2 }}>{premio.premio}</DataTable.Cell>
                    </DataTable.Row>
                  ))}
                </DataTable>
              </View>
            )}
          </React.Fragment>
        ))}

        <DataTable.Pagination
          style={styles.pagination}
          page={page}
          numberOfPages={totalPages}
          onPageChange={(newPage) => setPage(newPage)}
          label={`${from + 1}-${to} de ${mockData.length}`}
          showFastPaginationControls
        />
      </DataTable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingTop: 24,
  },
  title: {
    marginBottom: 8,
    textAlign: 'center',
    color: '#BB0014',
    fontWeight: 'bold',
  },
  subTable: {
    borderRadius: 10,
    backgroundColor: '#f5f5f5',
  },
  pagination: {
    margin: 'auto'
  }
});

export default ResultsTable;