import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Tabs } from 'expo-router';

export default function _layout() {
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
