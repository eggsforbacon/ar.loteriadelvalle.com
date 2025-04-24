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
    <View style={[styles.ticketContainer, { borderColor: theme.colors.primary }]}>
      <View
        style={[
          styles.cutout,
          styles.leftCutout,
          {
            backgroundColor: theme.colors.background,
            borderRightWidth: BORDER_WIDTH,
            borderColor: theme.colors.primary,
          },
        ]}
      />

      <View
        style={[
          styles.cutout,
          styles.rightCutout,
          {
            backgroundColor: theme.colors.background,
            borderLeftWidth: BORDER_WIDTH,
            borderColor: theme.colors.primary,
          },
        ]}
      />

      <TextInput
        mode="outlined"
        outlineColor="transparent"
        activeOutlineColor="transparent"
        style={[styles.input, style]}
        left={<TextInput.Icon icon={iconName} />}
        {...rest}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  ticketContainer: {
    flex: 1,
    marginHorizontal: 4,
    borderWidth: BORDER_WIDTH,
    borderRadius: 8,
    overflow: 'visible',
    position: 'relative',
    backgroundColor: 'white',
  },
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
  input: {
    backgroundColor: 'transparent',
    paddingHorizontal: 0,
    zIndex: 0,
  },
});