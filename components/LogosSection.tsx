import React from "react";
import { View, Image, TouchableOpacity, Linking, Dimensions } from "react-native";

import { Logos, Logo } from "~/data/logos";

const { width: screenWidth } = Dimensions.get("window");
const BASE_WIDTH = (screenWidth - 48) / 3;

const LogosSection: React.FC = () => {
  const handlePress = (url?: string) => {
    if (url) {
      Linking.openURL(url).catch((err) => console.error("Error opening URL:", err));
    }
  };

  const first4 = Logos.slice(0, 4);
  const last3 = Logos.slice(4);

  return (
    <View className="px-6">
      <View className="flex-row flex-wrap justify-between">
        {first4.map((logo: Logo) => (
          <TouchableOpacity
            key={logo.id}
            onPress={() => handlePress(logo.url)}
            disabled={!logo.url}
            style={{
              width: (screenWidth - 48) / 2,
              height: ((screenWidth - 48) / 2) * 0.6,
              marginBottom: 24,
            }}>
            <Image
              source={logo.image}
              style={{ width: "100%", height: "100%", resizeMode: "contain" }}
            />
          </TouchableOpacity>
        ))}
      </View>

      <View style={{ height: BASE_WIDTH * 0.8, position: "relative" }}>
        <TouchableOpacity
          onPress={() => handlePress(last3[0].url)}
          disabled={!last3[0].url}
          style={{
            position: "absolute",
            left: 20,
            bottom: 0,
            width: BASE_WIDTH,
            height: BASE_WIDTH * 0.6,
          }}>
          <Image
            source={last3[0].image}
            style={{ width: "100%", height: "100%", resizeMode: "contain" }}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handlePress(last3[1].url)}
          disabled={!last3[1].url}
          style={{
            position: "absolute",
            left: screenWidth / 2 - (BASE_WIDTH * 1.8) / 2,
            top: -40,
            width: BASE_WIDTH * 1.6,
            height: BASE_WIDTH,
          }}>
          <Image
            source={last3[1].image}
            style={{ width: "100%", height: "100%", resizeMode: "contain" }}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handlePress(last3[2].url)}
          disabled={!last3[2].url}
          style={{
            position: "absolute",
            right: 20,
            bottom: 0,
            width: BASE_WIDTH * 0.9,
            height: BASE_WIDTH * 0.54,
          }}>
          <Image
            source={last3[2].image}
            style={{ width: "100%", height: "100%", resizeMode: "contain" }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LogosSection;
