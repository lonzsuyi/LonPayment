module.exports = {
    preset: 'react-native',
    "globals": {
        "__DEV__": true
    },
    testEnvironment: 'node',
    "setupFiles": [
        "<rootDir>/jest/setup.js"
    ],
    moduleNameMapper: {
        "^[./a-zA-Z0-9$_-]+\\.(bmp|gif|jpg|jpeg|mp4|png|psd|svg|webp)$": "<rootDir>/node_modules/react-native/jest/assetFileTransformer.js"
    },
    transformIgnorePatterns: [
        'node_modules/(?!(jest-)?@?react-native|@react-native-community|@react-navigation)'
    ],
}