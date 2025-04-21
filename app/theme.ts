import { MD3LightTheme, MD3DarkTheme } from 'react-native-paper';

export const lightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#E21826',
    secondary: '#BB0014',
    accent: '#FEE503',
    background: '#FFFFFF',
    surface: '#FFFFFF',
    onSurface: '#000000',
  },
};

export const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#E21826',
    secondary: '#BB0014',
    accent: '#FEE503',
    background: '#121212',
    surface: '#1E1E1E',
    onSurface: '#FFFFFF',
  },
};