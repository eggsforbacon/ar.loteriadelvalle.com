import { requireNativeView } from 'expo';
import * as React from 'react';

import { OcrModuleViewProps } from './OcrModule.types';

const NativeView: React.ComponentType<OcrModuleViewProps> =
  requireNativeView('OcrModule');

export default function OcrModuleView(props: OcrModuleViewProps) {
  return <NativeView {...props} />;
}
