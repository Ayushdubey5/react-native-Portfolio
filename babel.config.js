module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [], // Completely empty now so Reanimated doesn't search native assets
  };
};