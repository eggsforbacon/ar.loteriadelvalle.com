import { Dimensions } from 'react-native';
import { Route } from 'expo-router';

export type MenuItemIcon = 'home-outline' | 'newspaper-outline' | 'radio-outline' | 'gift-outline';

export interface MenuItem {
  label: string;
  icon: MenuItemIcon;
  onPress: () => void;
  path?: Route | null;
}

export const MENU_WIDTH = Dimensions.get('window').width * 0.8;