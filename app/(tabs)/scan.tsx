import React, { useRef, useEffect } from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import LottieView from 'lottie-react-native';
import { useIsFocused } from '@react-navigation/native';

export default function Scan() {
  const isFocused = useIsFocused();
  const animationRef = useRef<LottieView>(null);

  useEffect(() => {
    if (isFocused) {
      animationRef.current?.play();
    } else {
      animationRef.current?.pause();
    }
  }, [isFocused]);

  return (
    <View className="flex-1 items-center justify-center px-4 bg-white">
      <Text className="text-2xl font-bold mb-4 text-center">
        ¡La sección de AR estará aquí pronto!
      </Text>

      <View
        style={styles.animationWrapper}
        className="rounded-2xl overflow-hidden mb-4 justify-center items-center bg-transparent"
      >
        <View className="w-full h-full">
          <LottieView
            ref={animationRef}
            source={require('assets/lottie/coming-soon.json')}
            loop
            style={{ width: '100%', height: '100%', backgroundColor: 'transparent' }}
          />
        </View>
      </View>
    </View>
  );
}

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  animationWrapper: {
    width: width * 0.8,
    height: width * 0.8,
  },
});
