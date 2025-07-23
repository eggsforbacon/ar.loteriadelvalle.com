"use client";

import { BottomSheetBackdrop, BottomSheetModal, BottomSheetScrollView } from "@gorhom/bottom-sheet";
import React, { forwardRef, ReactNode, useCallback, useMemo } from "react";
import { SafeAreaView } from "react-native";

type _Props = {
  children: ReactNode | ReactNode[];
  snaps?: string[];
};

const BottomSheetModalView = forwardRef<BottomSheetModal, _Props>(({ children, snaps }, ref) => {
  const snapPoints = useMemo(() => snaps ?? ["60%"], []);

  const renderBackdrop = useCallback(
    (props: any) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />,
    []
  );

  return (
    <SafeAreaView>
      <BottomSheetModal
        ref={ref}
        snapPoints={snapPoints}
        index={0}
        enablePanDownToClose
        backdropComponent={renderBackdrop}>
        <BottomSheetScrollView className="flex flex-col gap-4 px-6 py-4">
          {children}
        </BottomSheetScrollView>
      </BottomSheetModal>
    </SafeAreaView>
  );
});

export default BottomSheetModalView;
