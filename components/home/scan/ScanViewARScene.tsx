import {
  Viro3DObject,
  ViroAmbientLight,
  ViroARImageMarker,
  ViroARTrackingTargets,
  ViroImage,
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
        <ViroAmbientLight color="#FFFFFF" />
        <ViroNode
          position={[0, -0.1, -0.3]}
          scale={[1, 1, 1]}
          rotation={[0, 0, 0]}
          dragType="FixedDistance"
          highAccuracyEvents
          onDrag={() => { }}>
          {/* <Viro3DObject
            type="GLB"
            source={require("./../../../assets/models/lotero.glb")}
            position={[0, 0, 0]}
            scale={[1, 1, 1]}
            className={`transition-all duration-200 ease-in-out`}
          /> */}
          <ViroImage
            source={require("../../../assets/images/ar/viro.png")}
            width={0.22*1.3}
            height={0.4*1.3}
          />
        </ViroNode>
        <ViroARImageMarker target="logo" onAnchorFound={() => setShown(true)}></ViroARImageMarker>
      </ViroARScene>
    </View>
  );
};

ViroARTrackingTargets.createTargets({
  logo: {
    source: require("./../../../assets/images/ar/code.png"),
    orientation: "Up",
    physicalWidth: 0.1,
  },
});
