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
      className={`${styles.button} ${touchableProps.className}`}>
      <Text
        style={{
          fontFamily: Platform.select({
            android: "Poppins_700Bold",
            ios: "Poppins-Bold",
          }),
        }}
        className={styles.buttonText}>
        {title}
      </Text>
    </TouchableOpacity>
  );
});

const styles = {
  button: "items-center bg-primary-700 rounded-[28px] shadow-md p-4",
  buttonText: "text-white text-lg text-center",
};
