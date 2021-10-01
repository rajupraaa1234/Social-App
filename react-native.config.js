module.exports = {
    project: {
      ios: {},
      android: {}, // grouped into "project"
    },
    dependencies: {
      '@react-native-google-signin/google-signin': {
        platforms: {
          ios: null,
        },
      },
      'react-native-fbsdk-next': {
        platforms: {
          ios: null,
        },
      },
    },
    assets: ['./assets/fonts/'], // stays the same
  };