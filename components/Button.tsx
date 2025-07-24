import { forwardRef } from "react";
import { Platform, Text, TouchableOpacity, TouchableOpacityProps, View } from "react-native";

type ButtonProps = {
  title: string;
} & TouchableOpacityProps;

export const Button = forwardRef<View, ButtonProps>(({ title, ...touchableProps }, ref) => {
  return (
    <TouchableOpacity
      ref={ref}
      {...touchableProps}
      className={`items-center rounded-[28px] bg-primary-700 p-4 shadow-md ${touchableProps.className}`}>
      <Text
        style={{
          fontFamily: Platform.select({
            android: "Poppins_700Bold",
            ios: "Poppins-Bold",
          }),
        }}
        className="text-center text-lg text-white">
        {title}
      </Text>
    </TouchableOpacity>
  );
});
