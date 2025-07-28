import Constants from "expo-constants";
import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { DataTable, Button } from "react-native-paper";

const apiUrl = Constants.expoConfig?.extra?.apiUrl;

const ResultsTable = () => {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [page, setPage] = useState(0);
  const [draws, setDraws] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const itemsPerPage = 4;

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

  if (isLoading) {
    return <Text>Cargando...</Text>;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, draws.length);
  const totalPages = Math.ceil(draws.length / itemsPerPage);

  return (
    <View className="px-4 pt-6">
      <Text className="mb-4 text-center text-2xl font-bold text-primary-800">
        Histórico de resultados
      </Text>
      <DataTable className="gap-2">
        <DataTable.Header>
          <DataTable.Title>Sorteo</DataTable.Title>
          <DataTable.Title>Fecha</DataTable.Title>
          <DataTable.Title numeric>Detalles</DataTable.Title>
        </DataTable.Header>

        {draws.slice(from, to).map((row) => (
          <React.Fragment key={row.id}>
            <DataTable.Row>
              <DataTable.Cell>{row.draw}</DataTable.Cell>
              <DataTable.Cell>{row.date}</DataTable.Cell>
              <DataTable.Cell numeric>
                <Button
                  compact
                  onPress={() => setExpandedId(expandedId === row.id ? null : row.id)}
                >
                  {expandedId === row.id ? "Ocultar" : "Mostrar"}
                </Button>
              </DataTable.Cell>
            </DataTable.Row>

            {expandedId === row.id && (
              <View className="rounded-[10px] bg-[#f5f5f5]">
                <DataTable className="gap-2">
                  <DataTable.Header>
                    <DataTable.Title style={{ flex: 1 }}>Número</DataTable.Title>
                    <DataTable.Title style={{ flex: 1 }}>Serie</DataTable.Title>
                    <DataTable.Title style={{ flex: 2 }}>Premio</DataTable.Title>
                  </DataTable.Header>
                  {row.prizes.map((p: any, idx: number) => (
                    <DataTable.Row key={idx}>
                      <DataTable.Cell style={{ flex: 1 }}>{p.number}</DataTable.Cell>
                      <DataTable.Cell style={{ flex: 1 }}>{p.series}</DataTable.Cell>
                      <DataTable.Cell style={{ flex: 2 }}>{p.prize}</DataTable.Cell>
                    </DataTable.Row>
                  ))}
                </DataTable>
              </View>
            )}
          </React.Fragment>
        ))}

        <DataTable.Pagination
          className="self-center"
          page={page}
          numberOfPages={totalPages}
          onPageChange={(newPage) => setPage(newPage)}
          label={`${from + 1}-${to} de ${draws.length}`}
          showFastPaginationControls
        />
      </DataTable>
    </View>
  );
};

export default ResultsTable;