import { useIsFocused } from '@react-navigation/native';
import { ViroARSceneNavigator } from '@reactvision/react-viro';
import { useEffect, useRef, useState } from 'react';
import { Text, View } from 'react-native';

import { ScanViewARScene } from '~/components/home/scan/ScanViewARScene';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
let arNavigatorRef = null;

export default function Scan() {
  const isFocused = useIsFocused();
  const [showAR, setShowAR] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const arNavigator = useRef(null);

  useEffect(() => {
    if (isFocused) {
      setShowAR(true);
    } else {
      setShowAR(false);
    }
  }, [isFocused]);

  return (
    <View className={styles.container}>
      <Text className={styles.title}>My AR Experience</Text>

      <View className={styles.viroContainer}>
        {showAR && (
          <ViroARSceneNavigator
            ref={(ref) => (arNavigatorRef = ref)}
            initialScene={{ scene: ScanViewARScene }}
            style={{ flex: 1 }}
            autofocus
          />
        )}
      </View>

      <Text className={styles.description}>Explore the AR scene above!</Text>
    </View>
  );
}

const styles = {
  container: `flex-1 items-center justify-center gap- px-4 py-16 bg-white`,
  title: `text-2xl font-bold`,
  viroContainer: `w-full h-full rounded-lg overflow-hidden`,
  description: `text-lg text-center`,
};
