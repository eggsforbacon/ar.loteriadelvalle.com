import { SafeAreaView } from 'react-native';

export const Container = ({ children, fullScreen = false }: { children: React.ReactNode, fullScreen?: boolean }) => {
  return <SafeAreaView className={fullScreen ? 'flex-1' : 'flex-1 m-6'}>{children}</SafeAreaView>;
};