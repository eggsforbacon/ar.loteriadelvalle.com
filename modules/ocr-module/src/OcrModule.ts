import { NativeModule, requireNativeModule } from 'expo';

import { OcrModuleEvents } from './OcrModule.types';

declare class OcrModule extends NativeModule<OcrModuleEvents> {
  PI: number;
  hello(): string;
  setValueAsync(value: string): Promise<void>;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<OcrModule>('OcrModule');
