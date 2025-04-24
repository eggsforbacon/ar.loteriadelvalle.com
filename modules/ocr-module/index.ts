// Reexport the native module. On web, it will be resolved to OcrModule.web.ts
// and on native platforms to OcrModule.ts
export { default } from './src/OcrModule';
export { default as OcrModuleView } from './src/OcrModuleView';
export * from  './src/OcrModule.types';
