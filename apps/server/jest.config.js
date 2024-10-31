module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleNameMapper: {
    "^@repo/db$": "<rootDir>/node_modules/@repo/db",
  },
};
