module.exports = {
  testEnvironment: "jsdom",

  transform: {
    "^.+\\.[jt]sx?$": "babel-jest"
  },

  setupFilesAfterEnv: [
    "<rootDir>/src/setupTests.js"
  ],

  moduleFileExtensions: [
    "js",
    "jsx",
    "json"
  ],

  testMatch: [
    "**/__tests__/**/*.test.jsx",
    "**/?(*.)+(spec|test).jsx"
  ],

  clearMocks: true
};