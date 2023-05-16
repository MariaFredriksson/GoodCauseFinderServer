// const config = {
//   testEnvironment: 'node'
// }

// import { transform } from "@babel/core";

// // module.exports = config
// export default config

// export default {
//   testEnvironment: 'jest-environment-node',
//   transform: {}
// }

// {
//   "transform": {
//     "^.+\\.js$": "babel-jest"
//   }
// }

/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/en/configuration.html
 */

export default {
  // Indicates which provider should be used to instrument code for coverage
  coverageProvider: 'v8',

  // The test environment that will be used for testing
  testEnvironment: 'node',

  transform: {}

  // setupFilesAfterEnv: [
  //   'jest-extended/all',
  //   'jest-chain'
  // ]
}
