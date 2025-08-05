import React from "react";
import { View, Image, TouchableOpacity, Linking, Dimensions } from "react-native";

import { Logos } from "~/data/logos";

const { width: screenWidth } = Dimensions.get("window");
const BASE_WIDTH = (screenWidth - 48) / 3;

const LogosSection: React.FC = () => {
  const handlePress = (url?: string) => {
    if (url) {
      Linking.openURL(url).catch((err) => console.error("Error opening URL:", err));
    }
  };

  const [gobvalle, benevalle, loteria, juegolegal, gane, coljuegos, supergiros] = Logos;

  return (
    <View className="px-6 py-8">
      <View
        className="flex-row items-center justify-between"
        style={{ height: screenWidth * 0.2, marginBottom: 30 }}>
        <TouchableOpacity
          onPress={() => handlePress(gobvalle.url)}
          disabled={!gobvalle.url}
          style={{ width: "65%", height: "100%" }}>
          <Image
            source={gobvalle.image}
            style={{ width: "100%", height: "100%", resizeMode: "contain" }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handlePress(benevalle.url)}
          disabled={!benevalle.url}
          style={{ width: "30%", height: "100%" }}>
          <Image
            source={benevalle.image}
            style={{ width: "100%", height: "100%", resizeMode: "contain" }}
          />
        </TouchableOpacity>
      </View>

      <View
        className="flex-row items-center justify-between"
        style={{ height: screenWidth * 0.3, marginBottom: 40 }}>
        <TouchableOpacity
          onPress={() => handlePress(loteria.url)}
          disabled={!loteria.url}
          style={{ width: "48%", height: "100%" }}>
          <Image
            source={loteria.image}
            style={{ width: "100%", height: "100%", resizeMode: "contain" }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handlePress(juegolegal.url)}
          disabled={!juegolegal.url}
          style={{ width: "48%", height: "85%" }}>
          <Image
            source={juegolegal.image}
            style={{ width: "100%", height: "100%", resizeMode: "contain" }}
          />
        </TouchableOpacity>
      </View>

      <View style={{ height: BASE_WIDTH * 1.2, position: "relative" }}>
        <TouchableOpacity
          onPress={() => handlePress(gane.url)}
          disabled={!gane.url}
          style={{
            position: "absolute",
            left: 0,
            bottom: 0,
            width: BASE_WIDTH * 1.4,
            height: BASE_WIDTH * 0.6,
          }}>
          <Image
            source={gane.image}
            style={{ width: "100%", height: "100%", resizeMode: "contain" }}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handlePress(coljuegos.url)}
          disabled={!coljuegos.url}
          style={{
            position: "absolute",
            left: screenWidth / 2 - (BASE_WIDTH * 2.3) / 2,
            top: 0,
            width: BASE_WIDTH * 1.8,
            height: BASE_WIDTH * 0.5,
          }}>
          <Image
            source={coljuegos.image}
            style={{ width: "100%", height: "100%", resizeMode: "contain" }}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handlePress(supergiros.url)}
          disabled={!supergiros.url}
          style={{
            position: "absolute",
            right: 0,
            bottom: 0,
            width: BASE_WIDTH * 1.4,
            height: BASE_WIDTH * 0.6,
          }}>
          <Image
            source={supergiros.image}
            style={{ width: "100%", height: "100%", resizeMode: "contain" }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LogosSection;
