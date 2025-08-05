import React from "react";
import {
  View,
  Text,
  Image,
  useWindowDimensions,
  Platform,
  ImageSourcePropType,
  Linking,
} from "react-native";

export type OnboardingItemProps = {
  item: {
    id: string;
    title: string;
    description: string;
    image: ImageSourcePropType;
    liability?: string;
    liabilityUrl?: string;
  };
};

export const OnboardingItem = ({ item }: OnboardingItemProps) => {
  const { width } = useWindowDimensions();
  return (
    <View
      style={{
        width,
      }}
      className="flex-1 items-center justify-center">
      <Image
        style={{ objectFit: "contain" }}
        source={item.image}
        className="w-[80vw] flex-[0.7] justify-center"
      />
      <View style={{ flex: 0.3 }}>
        <Text
          className="mb-3 text-center text-2xl text-primary-800"
          style={{
            fontFamily: Platform.select({
              android: "Poppins_800ExtraBold",
              ios: "Poppins-ExtraBold",
            }),
          }}>
          {item.title}
        </Text>
        <View className="flex flex-1 flex-col justify-between">
          <Text
            className="px-8 text-center"
            style={{
              fontFamily: Platform.select({
                android: "Poppins_400Regular",
                ios: "Poppins-Regular",
              }),
            }}>
            {item.description}
          </Text>
          {item.liability && item.liabilityUrl && (
            <Text
              onPress={() => Linking.openURL(item.liabilityUrl!)}
              className="px-8 text-center text-xs text-neutral-600">
              {item.liability}
            </Text>
          )}
        </View>
      </View>
    </View>
  );
};
