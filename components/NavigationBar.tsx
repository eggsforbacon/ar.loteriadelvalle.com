import React from 'react';
import { Animated, View, useWindowDimensions } from 'react-native';

import { Button } from '~/components/Button';
import { OnboardingItemProps } from '~/components/OnboardingItem';

type NavigationProps = {
  data: OnboardingItemProps[];
  scrollX: Animated.Value;
  scrollTo: (mode: 'next' | 'prev') => void;
  currentIndex: number;
  onComplete?: () => void;
};

export const NavigationBar = ({ data, scrollX, scrollTo, currentIndex, onComplete }: NavigationProps) => {
  const { width } = useWindowDimensions();

  return (
    <View className={styles.container}>
      <View className={styles.pagination}>
        {data.map((_, i) => {
          const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
          const dotWidth = scrollX.interpolate({
            inputRange,
            outputRange: [10, 20, 10],
            extrapolate: 'clamp',
          });
          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.2, 1, 0.2],
            extrapolate: 'clamp',
          });
          return (
            <Animated.View
              className={styles.dot}
              style={{ width: dotWidth, opacity }}
              key={i.toString()}
            />
          );
        })}
      </View>
      <View className={styles.bar}>
        <Button title="Anterior" className={styles.previous} onPress={() => scrollTo('prev')} />
        {currentIndex === data.length - 1 ? (
          <Button title="Finalizar" className={styles.continue} onPress={onComplete} />
        ) : (
          <Button title="Siguiente" className={styles.continue} onPress={() => scrollTo('next')} />
        )}
      </View>
    </View>
  );
};

const styles = {
  container: `flex flex-col items-center justify-end`,
  bar: `flex-row px-6 pb-4 items-center justify-center gap-4`,
  pagination: `flex-row py-6`,
  previous: `flex-1`,
  continue: `flex-1`,
  dot: `h-2.5 rounded-xl bg-primary-600 mx-1`,
};
