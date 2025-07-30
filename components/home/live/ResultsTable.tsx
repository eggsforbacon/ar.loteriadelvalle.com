import Constants from "expo-constants";
import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";

import { Button } from "~/components/Button";
import { Cell, Header, Pagination, Row, Table, Title } from "~/components/ui/tables";

const apiUrl = Constants.expoConfig?.extra?.apiUrl;

const ResultsTable = () => {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [page, setPage] = useState(0);
  const [draws, setDraws] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const itemsPerPage = 4;
  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, draws.length);
  const totalPages = Math.ceil(draws.length / itemsPerPage);

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

  return (
    <View className="px-4 pt-6">
      <Text className="mb-4 text-center text-2xl font-bold text-primary-800">
        Histórico de resultados
      </Text>
      <Table>
        <Header>
          <Title>Sorteo</Title>
          <Title>Fecha</Title>
          <Title>Detalles</Title>
        </Header>
        {draws.slice(from, to).map((row) => (
          <React.Fragment key={row.id}>
            <Row>
              <Cell>
                <Text>{row.draw}</Text>
              </Cell>
              <Cell>
                <Text>{row.date}</Text>
              </Cell>
              <Cell>
                <Button
                  title={expandedId === row.id ? "Ocultar" : "Mostrar"}
                  compact
                  onPress={() => setExpandedId(expandedId === row.id ? null : row.id)}
                />
              </Cell>
            </Row>
            {expandedId === row.id && (
              <View className="mb-8 rounded-xl bg-primary-50">
                <Table separatorClassName="bg-primary-100">
                  <Header>
                    <Title>Número</Title>
                    <Title>Serie</Title>
                    <Title>Premio</Title>
                  </Header>
                  {row.prizes.map((p: any, idx: number) => (
                    <Row key={idx}>
                      <Cell>
                        <Text>{p.number}</Text>
                      </Cell>
                      <Cell>
                        <Text>{p.series}</Text>
                      </Cell>
                      <Cell>
                        <Text>{p.prize}</Text>
                      </Cell>
                    </Row>
                  ))}
                </Table>
              </View>
            )}
          </React.Fragment>
        ))}
        <Pagination
          page={page}
          numberOfPages={totalPages}
          onPageChange={(newPage) => setPage(newPage)}
          label={`${from + 1}-${to} de ${draws.length} páginas`}
        />
      </Table>
    </View>
  );
};

export default ResultsTable;
