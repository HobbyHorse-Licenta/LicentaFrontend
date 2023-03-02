module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
          'module-resolver',
          {
            "root": ['./components'],
            "extensions": ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
            "alias": {'@schedule': './schedule/index'}
           
          },
      ]
    ],
  };
};
