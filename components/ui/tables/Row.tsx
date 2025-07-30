import { ReactNode } from "react";
import { View } from "react-native";

const Row = ({ children }: { children: ReactNode | ReactNode[] }) => {
  return <View className="flex flex-row items-center justify-between p-4">{children}</View>;
};

export default Row;
