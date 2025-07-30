import { ReactNode } from "react";
import { View } from "react-native";

const Cell = ({ children }: { children: ReactNode | ReactNode[] }) => {
  return <View className="flex-1">{children}</View>;
};

export default Cell;
