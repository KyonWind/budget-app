module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      require.resolve('babel-plugin-module-resolver'),
      {
        cwd: 'babelrc',
        extensions: ['.ts', '.tsx', '.js', '.ios.js', '.android.js'],
        alias: {
         // '@root': './src', // replace '@youralias' and './src' with your own alias and directory
          '@assets': './src/assets', // replace '@youralias' and './src' with your own alias and directory
          '@interface': './src/interfaces', // replace '@youralias' and './src' with your own alias and directory
          '@context': './src/context', // replace '@youralias' and './src' with your own alias and directory
          '@theme': './src/theme', // replace '@youralias' and './src' with your own alias and directory
          '@kyon': './src/KyonToolBox', // replace '@youralias' and './src' with your own alias and directory
          '@pages': './src/pages', // replace '@youralias' and './src' with your own alias and directory
          '@service': './src/services', // replace '@youralias' and './src' with your own alias and directory
          '@const': './src/const', // replace '@youralias' and './src' with your own alias and directory
          '@components': './src/components', // replace '@youralias' and './src' with your own alias and directory
        },
      },
    ],
  ],
};
