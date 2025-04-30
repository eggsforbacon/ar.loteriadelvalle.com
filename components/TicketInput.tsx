import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, TextInputProps, useTheme } from 'react-native-paper';

export interface TicketInputProps extends Omit<
  TextInputProps,
  'left' | 'right' | 'outlineColor' | 'activeOutlineColor'
> {
  iconName: React.ComponentProps<typeof TextInput.Icon>['icon'];
}

const RADIUS = 10;
const DIAMETER = RADIUS * 2;
const BORDER_WIDTH = 1.4;

export function TicketInput({
  iconName,
  style,
  ...rest
}: TicketInputProps) {
  const theme = useTheme();

  return (
    <View
      className="flex-1 mx-1 border border-brand-red rounded-lg bg-white relative overflow-visible"
      style={{ borderWidth: BORDER_WIDTH }}
    >
      <View
        className="absolute w-5 h-5 top-1/2 -mt-2.5 bg-white border-r border-brand-red rounded-tr-full rounded-br-full z-10"
        style={{ left: -RADIUS, borderRightWidth: BORDER_WIDTH }}
      />
      <View
        className="absolute w-5 h-5 top-1/2 -mt-2.5 bg-white border-l border-brand-red rounded-tl-full rounded-bl-full z-10"
        style={{ right: -RADIUS, borderLeftWidth: BORDER_WIDTH }}
      />
      <TextInput
        mode="outlined"
        outlineColor="transparent"
        activeOutlineColor="transparent"
        className="bg-transparent px-0 z-0"
        style={style}
        left={<TextInput.Icon icon={iconName} />}
        {...rest}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  cutout: {
    position: 'absolute',
    width: DIAMETER,
    height: DIAMETER,
    top: '50%',
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