module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          Components: './src/components',
          Assets: './src/assets',
          Routes: './src/routes',
          Pages: './src/pages',
          Styles: './src/styles',
        },
      },
    ],
  ],
};
