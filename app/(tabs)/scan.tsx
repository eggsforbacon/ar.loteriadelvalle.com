import { AntDesign } from "@expo/vector-icons";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useIsFocused } from "@react-navigation/native";
import { ViroARSceneNavigator } from "@reactvision/react-viro";
import { BarcodeScanningResult, CameraView, useCameraPermissions } from "expo-camera";
import { useFocusEffect } from "expo-router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

import { ScanViewARScene } from "~/components/home/scan/ScanViewARScene";
import TutorialBottomSheet from "~/components/scan/tutorial-bottom-sheet";
import { useBottomSheetModalStore } from "~/store/bottom-sheet";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
let arNavigatorRef = null;

export default function Scan() {
  const isFocused = useIsFocused();
  const [showAR, setShowAR] = useState(true);
  const [codeDetected, setCodeDetected] = useState<boolean>(false);
  const [permission, requestPermission] = useCameraPermissions();
  const modalRef = useRef<BottomSheetModal>(null);

  useFocusEffect(
    useCallback(() => {
      setCodeDetected(false);
    }, [])
  );

  useEffect(() => {
    if (!permission || !permission.granted) {
      requestPermission();
    }
  }, [permission]);

  useEffect(() => {
    if (isFocused) {
      setShowAR(true);
    } else {
      setShowAR(false);
    }
  }, [isFocused]);

  const handleBarcodeScan = ({ data, type: _ }: BarcodeScanningResult) => {
    const MATCH = "https://qrco.de/bg9PYP";
    if (data === MATCH) {
      setCodeDetected(true);
    }
  };

  const { toggleModal } = useBottomSheetModalStore();

  const openModal = useCallback(() => {
    if (modalRef !== null) {
      modalRef.current?.present();
      modalRef.current?.expand();
      toggleModal();
    } else {
      console.error("Modal is null: ", modalRef);
    }
  }, []);

  return (
    <View className="relative flex-1 items-center justify-center gap-4 bg-white">
      <View className="h-full w-full overflow-hidden">
        {!codeDetected && (
          <CameraView
            style={{ flex: 1 }}
            className="debug"
            facing="back"
            barcodeScannerSettings={{
              barcodeTypes: ["qr", "ean13", "ean8", "upc_a", "upc_e", "code39", "code128"],
            }}
            onBarcodeScanned={(r) => {
              handleBarcodeScan(r);
            }}
          />
        )}
        {showAR && codeDetected && (
          <ViroARSceneNavigator
            ref={(ref) => (arNavigatorRef = ref)}
            initialScene={{ scene: ScanViewARScene }}
            style={{ flex: 1 }}
            autofocus
          />
        )}
      </View>
      <TutorialBottomSheet ref={modalRef} />
      <TouchableOpacity
        activeOpacity={0.8}
        className="absolute bottom-6 right-4 flex h-16 flex-row items-center justify-center gap-2 rounded-xl bg-primary-600 px-4 py-2"
        onPress={() => openModal()}>
        <AntDesign name="question" size={24} color="white" />
        <Text className="text-base font-semibold text-white">¿Cómo funciona?</Text>
      </TouchableOpacity>
    </View>
  );
}
