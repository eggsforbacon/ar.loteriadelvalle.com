import type { StyleProp, ViewProps, ViewStyle } from 'react-native';

export type OnLoadEventPayload = {
  url: string;
};

export type OcrModuleEvents = {
  onChange: (params: ChangeEventPayload) => void;
};

export type ChangeEventPayload = {
  value: string;
};

export type OcrModuleViewProps = {
  url: string;
  onLoad: (event: { nativeEvent: OnLoadEventPayload }) => void;
  onEventDispatcher?: (event: any) => void;
  style?: StyleProp<ViewStyle>;
} & ViewProps;
