import { forwardRef, ReactNode } from "react";
import { Platform, Text, TouchableOpacity, TouchableOpacityProps, View } from "react-native";

type ButtonProps = {
  title: string;
  icon?: ReactNode;
  compact?: boolean;
} & TouchableOpacityProps;

export const Button = forwardRef<View, ButtonProps>(
  ({ title, icon, compact, ...touchableProps }, ref) => {
    return (
      <TouchableOpacity
        ref={ref}
        {...touchableProps}
        className={`relative flex flex-row items-center justify-center gap-4 rounded-full ${compact ? "rounded-full p-2" : "bg-primary-600 p-4 shadow-md"} ${touchableProps.className}`}>
        <Text
          style={{
            fontFamily: Platform.select({
              android: "Poppins_700Bold",
              ios: "Poppins-Bold",
            }),
          }}
          className={`text-center  ${compact ? "text-base text-primary-600" : "text-lg text-white"}`}>
          {title}
        </Text>
        {icon && <View className="aspect-square w-6">{icon}</View>}
      </TouchableOpacity>
    );
  }
);
