'use client';

import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Tabs } from 'expo-router';
import { useEffect } from 'react';
import { requestCameraPermissionsAsync } from "expo-image-picker";

export default function _layout() {
  useEffect(() => {
    try {
      AsyncStorage.getItem('onboarded').then((value) => {
        console.info(`'onboarded': ${value}`);
        if (value === null || value !== 'true') {
          console.info('No "onboarded" stored. Generating flag...');
          AsyncStorage.setItem('onboarded', JSON.stringify(true)).then();
          console.info('"onboarded" stored as true. Onboarding should skip next time');
        } else {
          console.info("'onboarded' stored as true.");
        }
      });
    } catch (error) {
      console.error(error);
      console.info(`Unable reading or setting onboarded value: ${error}`);
    }
  }, []);

  useEffect(() => {
    requestCameraPermissionsAsync().then((res) => {
      if (res.granted) {
        console.info('Camera permission granted');
      }
    });
  }, []);

  return (
    <Tabs>
      <Tabs.Screen
        name="feed"
        options={{
          tabBarIcon: ({ color }) => <FontAwesome6 name="newspaper" size={24} color={color} />,
          tabBarLabel: 'Feed',
          headerTitle: 'Feed',
          tabBarActiveTintColor: '#E21826',
        }}
      />
      <Tabs.Screen
        name="scan"
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="cube-scan" size={24} color={color} />
          ),
          tabBarLabel: 'Escanear',
          headerTitle: 'Escanear',
          tabBarActiveTintColor: '#E21826',
        }}
      />
      <Tabs.Screen
        name="wallet"
        options={{
          tabBarIcon: ({ color }) => <MaterialIcons name="wallet" size={24} color={color} />,
          tabBarLabel: 'Billetera',
          headerTitle: 'Billetera',
          tabBarActiveTintColor: '#E21826',
        }}
      />
      <Tabs.Screen
        name="live"
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="broadcast" size={24} color={color} />
          ),
          tabBarLabel: 'En Vivo',
          headerTitle: 'En Vivo',
          tabBarActiveTintColor: '#E21826',
        }}
      />
    </Tabs>
  );
}
