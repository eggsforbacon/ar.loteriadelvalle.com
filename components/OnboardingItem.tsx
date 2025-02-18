import React from 'react';
import {
  View,
  Text,
  Image,
  useWindowDimensions,
  Platform,
  ImageSourcePropType,
} from 'react-native';

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
      className={styles.container}>
      <Image
        style={{objectFit: 'contain'}}
        source={item.image}
        className={styles.image}
      />
      <View style={{ flex: 0.3 }}>
        <Text
          className={styles.title}
          style={{
            fontFamily: Platform.select({
              android: 'Poppins_800ExtraBold',
              ios: 'Poppins-ExtraBold',
            }),
          }}>
          {item.title}
        </Text>
        <Text
          className={styles.description}
          style={{
            fontFamily: Platform.select({
              android: 'Poppins_400Regular',
              ios: 'Poppins-Regular',
            }),
          }}>
          {item.description}
        </Text>
      </View>
    </View>
  );
};

const styles = {
  container: `items-center flex-1 justify-center`,
  image: `flex-[0.7] justify-center w-[80vw]`,
  title: `text-2xl mb-3 text-center text-secondary`,
  description: `px-16 text-center`,
};
