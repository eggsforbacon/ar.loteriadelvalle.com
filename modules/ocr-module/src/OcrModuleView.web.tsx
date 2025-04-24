import * as React from 'react';

import { OcrModuleViewProps } from './OcrModule.types';

export default function OcrModuleView(props: OcrModuleViewProps) {
  return (
    <div>
      <iframe
        style={{ flex: 1 }}
        src={props.url}
        onLoad={() => props.onLoad({ nativeEvent: { url: props.url } })}
      />
    </div>
  );
}
