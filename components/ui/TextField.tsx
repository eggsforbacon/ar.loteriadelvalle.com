"use client";

import { ReactNode, useEffect, useState } from "react";
import {
  View,
  TextInput,
  Text,
  NativeSyntheticEvent,
  TextInputFocusEventData,
  TextInputChangeEventData,
  KeyboardTypeOptions,
} from "react-native";

export const TextField = ({
  label,
  value,
  onChange,
  onChangeText,
  onFocus,
  keyboardType,
  maxLength,
  icon,
}: {
  label: string;
  value: string;
  onChange?: (e: NativeSyntheticEvent<TextInputChangeEventData>) => void;
  onChangeText?: (text: string) => void;
  onFocus?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  keyboardType?: KeyboardTypeOptions;
  maxLength?: number;
  icon?: ReactNode;
}) => {
  const [active, setActive] = useState<boolean>(false);
  const [hasValue, setHasValue] = useState<boolean>(false);

  useEffect(() => {
    if (value !== "") setHasValue(true);
    else setHasValue(false);
  }, [value]);

  return (
    <View className="flex w-full flex-row items-center justify-center">
      <View className="relative w-full rounded-lg border border-neutral-400 bg-white py-4">
        <Text
          className={`absolute left-2 top-1/2 px-2 text-lg transition-all duration-200 ease-in-out ${active && "text-primary-600"} ${active || hasValue ? "-translate-y-10 text-accent-400" : "text-neutral-700"}`}>
          {label}
        </Text>
        <TextInput
          className="relative rounded px-4"
          keyboardType={keyboardType}
          onFocus={(e) => {
            setActive(true);
            onFocus && onFocus(e);
          }}
          onBlur={() => setActive(false)}
          onChange={onChange}
          onChangeText={onChangeText}
          value={value}
          maxLength={maxLength}
        />
        <View className="absolute right-2 top-1/2 flex aspect-square w-8 flex-row items-stretch justify-center">
          {icon && icon}
        </View>
      </View>
    </View>
  );
};
