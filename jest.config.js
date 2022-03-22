// Sync object
/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
    verbose: true,
    "setupFilesAfterEnv": [
        "<rootDir>/jest/mocks/jest.setup.js"
    ],
    "collectCoverageFrom": [
        "src/**/*.{js,jsx,ts,tsx}",
        "!src/**/*.d.ts"
    ],
    "testMatch": [
        "<rootDir>/tests/**/__tests__/**/*.{js,jsx,ts,tsx}",
        "<rootDir>/tests/**/*.{spec,test}.{js,jsx,ts,tsx}"
    ],
    "testEnvironment": "jsdom",
    "transformIgnorePatterns": [
        "[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs|cjs|ts|tsx)$",
        "^.+\\.module\\.(css|sass|scss)$"
    ],
    "transform": {
        "^.+\\.(js|jsx|mjs|cjs|ts|tsx)$": "<rootDir>/node_modules/babel-jest",
        "^.+\\.scss$": "jest-scss-transform",
        "^.+\\.css$": "<rootDir>/jest/mocks/cssMock.js"
    },
    "moduleNameMapper": {
        "^.+\\.module\\.(css|sass|scss)$": "identity-obj-proxy",
        "@fluentui/react/lib/(.*)$": "<rootDir>/node_modules/@fluentui/react/lib-commonjs/$1",
        "office-ui-fabric-react/lib/(.*)$": "<rootDir>/node_modules/office-ui-fabric-react/lib-commonjs/$1",
    },
    "watchPlugins": [
        "jest-watch-typeahead/filename",
        "jest-watch-typeahead/testname"
    ],
    "resetMocks": true
};

module.exports = config;
