import { Text } from "react-native";

const Title = ({ children, className }: { children: string; className?: string }) => {
  return <Text className={`text-neutral-600 ${className}`}>{children}</Text>;
};

export default Title;
