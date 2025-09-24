import { Viro3DObject, ViroAmbientLight, ViroNode } from "@reactvision/react-viro";
import { View } from "react-native";

import { ViroARScene } from "~/node_modules/@reactvision/react-viro";

export const ScanViewARScene = () => {
  return (
    <View className="px-6">
      <ViroARScene>
        <ViroAmbientLight color="#FFFFFF" />
        <ViroNode
          position={[0, -0.1, -0.3]}
          scale={[1, 1, 1]}
          rotation={[0, 0, 0]}
          dragType="FixedDistance"
          highAccuracyEvents
          onDrag={() => {}}>
          <Viro3DObject
            type="GLB"
            source={require("./../../../assets/models/lotero.glb")}
            position={[0, 0, 0]}
            scale={[1, 1, 1]}
            className="transition-all duration-200 ease-in-out"
          />
        </ViroNode>
      </ViroARScene>
    </View>
  );
};
