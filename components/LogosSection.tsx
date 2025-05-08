import React from 'react';
import { View, Image, TouchableOpacity, Linking, Dimensions } from 'react-native';
import { Logos, Logo } from '~/data/logos';

const { width: screenWidth } = Dimensions.get('window');
const logoWidth = (screenWidth - 48) / 2;

const LogosSection: React.FC = () => {
  const handlePress = (url?: string) => {
    if (url) {
      Linking.openURL(url).catch((err) => console.error('Error opening URL:', err));
    }
  };

  return (
    <View className="px-6">
      <View className="flex-row flex-wrap justify-between">
        {Logos.map((logo: Logo) => (
          <TouchableOpacity
            key={logo.id}
            onPress={() => handlePress(logo.url)}
            disabled={!logo.url}
            style={{ width: logoWidth, height: logoWidth * 0.6, marginBottom: 24 }}
          >
            <Image
              source={logo.image}
              style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default LogosSection;