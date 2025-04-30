import React, { useEffect, useState } from 'react';
import { View, Text, Dimensions } from 'react-native';
import FlipUnit from './FlipUnit';

const { width } = Dimensions.get('window');
const MARGIN = 16;
const GAP = 16;
const UNITS = 4;
const BOX_SIZE = (width - MARGIN * 2 - GAP * (UNITS - 1)) / UNITS;

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function computeTimeLeft(): TimeLeft {
  const now = new Date();
  const dow = now.getDay();
  let daysUntil = (3 - dow + 7) % 7;

  if (
    dow === 3 &&
    (now.getHours() > 22 ||
      (now.getHours() === 22 && now.getMinutes() >= 0))
  ) {
    daysUntil = 7;
  }

  const target = new Date(now);
  target.setDate(now.getDate() + daysUntil);
  target.setHours(22, 0, 0, 0);

  const diffSec = Math.floor((target.getTime() - now.getTime()) / 1000);
  const days = Math.floor(diffSec / 86400);
  const hours = Math.floor((diffSec % 86400) / 3600);
  const minutes = Math.floor((diffSec % 3600) / 60);
  const seconds = diffSec % 60;

  return { days, hours, minutes, seconds };
}

export default function NextDrawCountdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(computeTimeLeft);

  useEffect(() => {
    const iv = setInterval(() => setTimeLeft(computeTimeLeft()), 1000);
    return () => clearInterval(iv);
  }, []);

  return (
    <View className="bg-brand-dark-red rounded-2xl mx-4 mt-4 py-4">
      <Text className="text-white text-2xl font-bold text-center mb-3">
        PRÓXIMO SORTEO EN
      </Text>
      <View className="flex-row justify-between px-4">
        <View
          className="bg-brand-yellow rounded-lg justify-center items-center"
          style={{ width: BOX_SIZE, height: BOX_SIZE }}
        >
          <FlipUnit value={timeLeft.days} />
          <Text className="text-sm text-black mb-5">Días</Text>
        </View>
        <View
          className="bg-brand-yellow rounded-lg justify-center items-center"
          style={{ width: BOX_SIZE, height: BOX_SIZE }}
        >
          <FlipUnit value={timeLeft.hours} />
          <Text className="text-sm text-black mb-5">Horas</Text>
        </View>
        <View
          className="bg-brand-yellow rounded-lg justify-center items-center"
          style={{ width: BOX_SIZE, height: BOX_SIZE }}
        >
          <FlipUnit value={timeLeft.minutes} />
          <Text className="text-sm text-black mb-5">Minutos</Text>
        </View>
        <View
          className="bg-brand-yellow rounded-lg justify-center items-center"
          style={{ width: BOX_SIZE, height: BOX_SIZE }}
        >
          <FlipUnit value={timeLeft.seconds} />
          <Text className="text-sm text-black mb-5">Segundos</Text>
        </View>
      </View>
    </View>
  );
}