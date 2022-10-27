const { getDefaultConfig } = require("expo/metro-config");

module.exports = (async () => {
    let config = getDefaultConfig(__dirname);
    let { transformer, resolver } = config;

    return {
        transformer: {
            ...transformer,
            babelTransformerPath: require.resolve("./transformer.js")
        },
        resolver: {
            ...resolver,
            assetExts: resolver.assetExts.filter((ext) => ext !== "svg"),
            sourceExts: [...resolver.sourceExts, "svg", "cjs", "jsx", "scss", "sass"]
        }
    };
})();