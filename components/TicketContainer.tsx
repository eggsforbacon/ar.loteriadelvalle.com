import React from "react";
import { View, ViewProps } from "react-native";

const RADIUS = 26;
const BORDER_WIDTH = 1.6;

export function TicketContainer({ className, style, children, ...rest }: ViewProps) {
  return (
    <View
      className={`relative mx-1 overflow-visible rounded-lg border border-primary-600 bg-white ${className}`}
      style={[{ borderWidth: BORDER_WIDTH }, style]}
      {...rest}>
      <View
        className="absolute top-1/2 z-10 -mt-2.5 h-14 w-14 rounded-br-full rounded-tr-full border-r border-primary-600 bg-white"
        style={{ left: -RADIUS, borderRightWidth: BORDER_WIDTH + 0.2 }}
      />
      <View
        className="absolute top-1/2 z-10 -mt-2.5 h-14 w-14 rounded-bl-full rounded-tl-full border-l border-primary-600 bg-white"
        style={{ right: -RADIUS, borderLeftWidth: BORDER_WIDTH + 0.2 }}
      />
      {children}
    </View>
  );
}
