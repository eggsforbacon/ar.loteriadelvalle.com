import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { View, Text, TouchableOpacity, Linking, Image } from "react-native";

const xLogo = require("../assets/logos/x-logo.png");

const socials = [
  {
    name: "facebook",
    url: "https://www.facebook.com/lotevalle",
    icon: <FontAwesome name="facebook-square" size={32} />,
  },
  {
    name: "instagram",
    url: "https://www.instagram.com/loteriadelvalle",
    icon: <FontAwesome name="instagram" size={32} />,
  },
  {
    name: "x",
    url: "https://x.com/loteriadelvalle",
    icon: <Image source={xLogo} style={{ width: 32, height: 32, resizeMode: "contain" }} />,
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
    <View className="mx-4 rounded-2xl bg-white px-4 py-6">
      <Text className="text-primary mb-6 text-center text-2xl font-bold">
        ¡Síguenos en nuestras redes!
      </Text>
      <View className="flex-row justify-around">
        {socials.map((item) => (
          <TouchableOpacity
            key={item.name}
            onPress={() => handlePress(item.url)}
            activeOpacity={0.7}
            className="items-center">
            <View className="h-20 w-20 items-center justify-center rounded-full bg-white shadow-md">
              {item.icon}
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
