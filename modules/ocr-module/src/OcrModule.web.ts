import { registerWebModule, NativeModule } from 'expo';

import { ChangeEventPayload } from './OcrModule.types';

type OcrModuleEvents = {
  onChange: (params: ChangeEventPayload) => void;
}

class OcrModule extends NativeModule<OcrModuleEvents> {
  PI = Math.PI;
  async setValueAsync(value: string): Promise<void> {
    this.emit('onChange', { value });
  }
  hello() {
    return 'Hello world! 👋';
  }
};

export default registerWebModule(OcrModule);
