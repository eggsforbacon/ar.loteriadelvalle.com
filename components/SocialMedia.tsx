import React from 'react';
import { View, Text, TouchableOpacity, Linking, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const xLogo = require('../assets/logos/x-logo.png');

const socials = [
  {
    name: 'facebook',
    url: 'https://www.facebook.com/lotevalle',
    icon: <FontAwesome name="facebook-square" size={32} />, 
  },
  {
    name: 'instagram',
    url: 'https://www.instagram.com/loteriadelvalle',
    icon: <FontAwesome name="instagram" size={32} />, 
  },
  {
    name: 'x',
    url: 'https://x.com/loteriadelvalle',
    icon: <Image source={xLogo} style={{ width: 32, height: 32, resizeMode: 'contain' }} />, 
  },
];

export default function SocialSection() {
  const handlePress = async (url: string) => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    }
  };

  return (
    <View className="px-4 py-6 bg-white rounded-2xl mx-4">
      <Text className="text-center text-2xl font-bold text-primary mb-6">¡Síguenos en nuestras redes!</Text>
      <View className="flex-row justify-around">
        {socials.map((item) => (
          <TouchableOpacity
            key={item.name}
            onPress={() => handlePress(item.url)}
            activeOpacity={0.7}
            className="items-center"
          >
            <View className={`w-20 h-20 rounded-full bg-white shadow-md items-center justify-center`}>  
              {item.icon}
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}