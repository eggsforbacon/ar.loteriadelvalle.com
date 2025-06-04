// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const createConfig = () => {
  /** @type {import("expo/metro-config").MetroConfig} */
  // eslint-disable-next-line no-undef
  const config = getDefaultConfig(__dirname);

  const { transformer, resolver } = config;

  const extensions = [
    "lib",
    "obj",
    "mtl",
    "mp3",
    "JPG",
    "vrx",
    "hdr",
    "gltf",
    "glb",
    "bin",
    "arobject",
    "gif",
  ];

  config.transformer = {
    ...transformer,
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  };
  config.resolver = {
    ...resolver,
    assetExts: [...resolver.assetExts, ...extensions],
  };
  return config;
};

/** @type {import("expo/metro-config").MetroConfig} */
// eslint-disable-next-line no-undef
const config = createConfig();

module.exports = withNativeWind(config, { input: "./global.css" });
