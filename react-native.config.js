module.exports = {
  platforms: {
    ios: {},
    android: {}, // projects are grouped into "platforms"
  },
  assets: ['./assets/fonts', './assets/sounds'], // stays the same
  dependencies: {
    'react-native-vector-icons': {
      platforms: {
        ios: null,
      },
    },
  },
};
