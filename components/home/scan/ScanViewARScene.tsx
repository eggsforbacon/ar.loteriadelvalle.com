import {
  Viro3DObject,
  ViroAmbientLight,
  ViroARImageMarker,
  ViroARTrackingTargets,
  ViroNode,
} from "@reactvision/react-viro";
import { useEffect, useState } from "react";
import { View } from "react-native";

import { ViroARScene } from "~/node_modules/@reactvision/react-viro";

export const ScanViewARScene = () => {
  const [shown, setShown] = useState<boolean>(false);

  useEffect(() => {
    console.info("Detected: ", shown);
  }, [shown]);

  return (
    <View className="px-6">
      <ViroARScene>
        <ViroARImageMarker target="logo" onAnchorFound={() => setShown(true)}>
          <ViroAmbientLight color="#FFFFFF" />
          <ViroNode
            position={[0, 0, 0]}
            scale={[1, 1, 1]}
            rotation={[0, 0, 0]}
            dragType="FixedToPlane"
            onDrag={() => {}}>
            <Viro3DObject
              type="GLB"
              source={require("./../../../assets/models/walkman.glb")}
              position={[0, 0, 0]}
              scale={[1, 1, 1]}
              className={`transition-all duration-200 ease-in-out ${shown ? "opacity-100" : "opacity-0"}`}
            />
          </ViroNode>
        </ViroARImageMarker>
      </ViroARScene>
    </View>
  );
};

ViroARTrackingTargets.createTargets({
  logo: {
    source: require("./../../../assets/images/ar/code.png"),
    orientation: "Up",
    physicalWidth: 0.2,
  },
});
