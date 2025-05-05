import React from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, TextInputProps, useTheme } from "react-native-paper";

export interface TicketInputProps
  extends Omit<TextInputProps, "left" | "right" | "outlineColor" | "activeOutlineColor"> {
  iconName: React.ComponentProps<typeof TextInput.Icon>["icon"];
}

const RADIUS = 10;
const DIAMETER = RADIUS * 2;
const BORDER_WIDTH = 1.4;

export function TicketInput({ iconName, style, ...rest }: TicketInputProps) {
  const theme = useTheme();

  return (
    <View
      className="relative mx-1 flex-1 overflow-visible rounded-lg border border-primary-600 bg-white"
      style={{ borderWidth: BORDER_WIDTH }}>
      <View
        className="absolute top-1/2 z-10 -mt-2.5 h-5 w-5 rounded-br-full rounded-tr-full border-r border-primary-600 bg-white"
        style={{ left: -RADIUS, borderRightWidth: BORDER_WIDTH }}
      />
      <View
        className="absolute top-1/2 z-10 -mt-2.5 h-5 w-5 rounded-bl-full rounded-tl-full border-l border-primary-600 bg-white"
        style={{ right: -RADIUS, borderLeftWidth: BORDER_WIDTH }}
      />
      <TextInput
        mode="outlined"
        outlineColor="transparent"
        activeOutlineColor="transparent"
        className="z-0 bg-transparent px-0"
        style={style}
        left={<TextInput.Icon icon={iconName} />}
        {...rest}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  cutout: {
    position: "absolute",
    width: DIAMETER,
    height: DIAMETER,
    top: "50%",
    marginTop: -RADIUS,
    zIndex: 2,
  },
  leftCutout: {
    left: -RADIUS,
    borderTopRightRadius: RADIUS,
    borderBottomRightRadius: RADIUS,
  },
  rightCutout: {
    right: -RADIUS,
    borderTopLeftRadius: RADIUS,
    borderBottomLeftRadius: RADIUS,
  },
});
