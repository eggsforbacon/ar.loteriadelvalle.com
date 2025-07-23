import { ReactNode } from "react";
import { SafeAreaView } from "react-native";

export const Container = ({
  children,
  fullScreen = false,
}: {
  children: ReactNode;
  fullScreen?: boolean;
}) => {
  return <SafeAreaView className={fullScreen ? "flex-1" : "m-6 flex-1"}>{children}</SafeAreaView>;
};
