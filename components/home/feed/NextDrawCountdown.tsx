import React, { useEffect, useState } from "react";
import { View, Text, Dimensions } from "react-native";
import FlipUnit from "./FlipUnit";

const { width } = Dimensions.get("window");
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
  const offset = 5 * 3600 * 1000;
  const localNow = new Date(now.getTime() - offset);
  const dow = localNow.getDay();
  let daysUntil = (3 - dow + 7) % 7;

  if (dow === 3 && (localNow.getHours() > 22 || (localNow.getHours() === 22 && localNow.getMinutes() >= 30))) {
    daysUntil = 7;
  }

  const targetLocal = new Date(localNow);
  targetLocal.setDate(localNow.getDate() + daysUntil);
  targetLocal.setHours(22, 30, 0, 0);

  const target = new Date(targetLocal.getTime() + offset);

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
    <View className="mx-4 mt-4 rounded-2xl bg-primary-800 py-4">
      <Text className="mb-3 text-center text-2xl font-bold text-white">PRÓXIMO SORTEO EN</Text>
      <View className="flex-row justify-between px-4">
        <View
          className="items-center justify-center rounded-lg bg-accent-400"
          style={{ width: BOX_SIZE, height: BOX_SIZE }}>
          <FlipUnit value={timeLeft.days} />
          <Text className="mb-5 text-sm text-black">Días</Text>
        </View>
        <View
          className="items-center justify-center rounded-lg bg-accent-400"
          style={{ width: BOX_SIZE, height: BOX_SIZE }}>
          <FlipUnit value={timeLeft.hours} />
          <Text className="mb-5 text-sm text-black">Horas</Text>
        </View>
        <View
          className="items-center justify-center rounded-lg bg-accent-400"
          style={{ width: BOX_SIZE, height: BOX_SIZE }}>
          <FlipUnit value={timeLeft.minutes} />
          <Text className="mb-5 text-sm text-black">Minutos</Text>
        </View>
        <View
          className="items-center justify-center rounded-lg bg-accent-400"
          style={{ width: BOX_SIZE, height: BOX_SIZE }}>
          <FlipUnit value={timeLeft.seconds} />
          <Text className="mb-5 text-sm text-black">Segundos</Text>
        </View>
      </View>
    </View>
  );
}