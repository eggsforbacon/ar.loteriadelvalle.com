import { View } from 'react-native';

import { ViroARScene, ViroText } from '~/node_modules/@reactvision/react-viro';

export const ScanViewARScene = () => {
  return (
    <View className="rounded-2xl px-6">
      <ViroARScene>
        <ViroText text="Hello World!" position={[0, 0, -1]} className="text-4xl text-primary" />
      </ViroARScene>
    </View>
  );
}