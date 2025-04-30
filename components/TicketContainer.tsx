import React from 'react';
import { View, ViewProps } from 'react-native';
import { useTheme } from 'react-native-paper';

const RADIUS = 26;
const DIAMETER = RADIUS * 2;
const BORDER_WIDTH = 1.6;

export function TicketContainer({ className, style, children, ...rest }: ViewProps) {
  const theme = useTheme();

  return (
    <View
      className={`flex-1 mx-1 border border-brand-red rounded-lg bg-white relative overflow-visible ${className}`}
      style={[{ borderWidth: BORDER_WIDTH }, style]}
      {...rest}
    >
      <View
        className="absolute w-14 h-14 top-1/2 -mt-2.5 bg-white border-r border-brand-red rounded-tr-full rounded-br-full z-10"
        style={{ left: -RADIUS, borderRightWidth: BORDER_WIDTH + 0.2 }}
      />
      <View
        className="absolute w-14 h-14 top-1/2 -mt-2.5 bg-white border-l border-brand-red rounded-tl-full rounded-bl-full z-10"
        style={{ right: -RADIUS, borderLeftWidth: BORDER_WIDTH + 0.2 }}
      />
      {children}
    </View>
  );
}