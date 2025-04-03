import { ViroARImageMarker, ViroARTrackingTargets } from '@reactvision/react-viro';
import { useState } from 'react';
import { View } from 'react-native';

import { ViroARScene, ViroText } from '~/node_modules/@reactvision/react-viro';

export const ScanViewARScene = () => {
  const [shown, setShown] = useState<boolean>(false);

  return (
    <View className="rounded-2xl px-6">
      <ViroARScene>
        <ViroARImageMarker target="code" onAnchorFound={() => setShown(true)}>
          <ViroText
            text="Hello World!"
            position={[0, 0, -1]}
            className={`text-4xl text-primary transition-all duration-200 ease-in-out ${shown ? 'opacity-100' : 'opacity-0'}`}
          />
        </ViroARImageMarker>
      </ViroARScene>
    </View>
  );
};

ViroARTrackingTargets.createTargets({
  code: {
    source: require('./../../../assets/images/ar/code.png'),
    orientation: 'Up',
    physicalWidth: 0.4,
  },
});
