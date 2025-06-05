import React from 'react';
import { ScrollView, Text } from 'react-native';
import { DataTable } from 'react-native-paper';
import { Prize } from '~/data/prizes-plan';

interface PrizeTableProps {
  data: Prize[];
  title: string;
  titleColumn: string;
}

const PrizeTable: React.FC<PrizeTableProps> = React.memo(({ data, title, titleColumn }) => {
  return (
    <>
      <Text className="text-center text-2xl font-bold text-primary-800 mb-4">{title}</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <DataTable className="gap-2 border border-gray-200">
          <DataTable.Header className="bg-gray-100">
            <DataTable.Title className="w-40 justify-center">
              <Text className="text-center">{titleColumn}</Text>
            </DataTable.Title>
            <DataTable.Title className="w-36 justify-center">
              <Text className="text-center">Valor Premio</Text>
            </DataTable.Title>
            <DataTable.Title className="w-20 justify-center">
              <Text className="text-center">CANT</Text>
            </DataTable.Title>
            <DataTable.Title className="w-48 justify-center">
              <Text className="text-center">Valor Neto Premio Billete</Text>
            </DataTable.Title>
            <DataTable.Title className="w-60 justify-center">
              <Text className="text-center">Valor Neto Total por Cada Fracción</Text>
            </DataTable.Title>
          </DataTable.Header>
          {data.map((row, index) => (
            <DataTable.Row key={index} className="border-b border-gray-200">
              <DataTable.Cell className="w-40 justify-center">
                <Text className="text-center">{row.premio}</Text>
              </DataTable.Cell>
              <DataTable.Cell className="w-36 justify-center">
                <Text className="text-center">{row.valorPremio}</Text>
              </DataTable.Cell>
              <DataTable.Cell className="w-20 justify-center">
                <Text className="text-center">{row.cantidad}</Text>
              </DataTable.Cell>
              <DataTable.Cell className="w-48 justify-center">
                <Text className="text-center">{row.valorNetoBillete}</Text>
              </DataTable.Cell>
              <DataTable.Cell className="w-60 justify-center">
                <Text className="text-center">{row.valorNetoFraccion}</Text>
              </DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
      </ScrollView>
    </>
  );
});

export default PrizeTable;