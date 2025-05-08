import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import React from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import PrizeTable from '~/components/PrizesPlan';
import { planDePremios, aproximacionesConSerie, aproximacionesDiferenteSerie } from '~/data/prizes-plan';

export default function Prizes() {
  return (
    <ScrollView
      contentContainerClassName="bg-white px-6 py-8 gap-8"
      showsVerticalScrollIndicator={false}
    >
      <View>
        <Pressable
          onPress={() => router.back()}
          accessibilityLabel="Volver atrás"
          accessibilityRole="button"
        >
          <Ionicons name="arrow-back" size={24} color="#1F2937" />
        </Pressable>
      </View>

      <View>
        <PrizeTable
          data={planDePremios}
          title="Plan de Premios"
          titleColumn="Premio"
        />
      </View>

      <View>
        <PrizeTable
          data={aproximacionesConSerie}
          title="Aproximaciones al Mayor con Serie"
          titleColumn="Concepto"
        />
      </View>

      <View>
        <PrizeTable
          data={aproximacionesDiferenteSerie}
          title="Aproximaciones al Mayor en Diferente Serie"
          titleColumn="Concepto"
        />
      </View>
    </ScrollView>
  );
}