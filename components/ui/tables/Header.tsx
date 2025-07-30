import { ReactNode } from "react";
import { View } from "react-native";

const Header = ({ children }: { children: ReactNode | ReactNode[] }) => {
  return (
    <View className="flex flex-col items-stretch justify-start py-4">
      <View className="flex flex-row items-stretch justify-between px-6 pb-4">{children}</View>
      <View className="h-px w-full rounded-full bg-neutral-500" />
    </View>
  );
};

export default Header;
