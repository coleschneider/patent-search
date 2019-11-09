module.exports = {
    cacheDirectory: "<rootDir>/jestCache",
    collectCoverageFrom: [
        "**/*.{ts,tsx}",
        "!**/node_modules/**",
        "!**/*.d.ts",
        "!**/{test,tests}/**"
    ],
    coveragePathIgnorePatterns: [
        "/types/",
        "/src/images",
        "/src/App.tsx",
        "/src/Routes.tsx",
        "/src/index.tsx",
        "/src/serviceWorker.ts",
        "src/Common/LazyRoute/LazyRoute.tsx"
    ],
    coverageThreshold: {
        global: {
            branches: -53,
            functions: -22,
            lines: -67,
            statements: -75
        }
    },
    modulePathIgnorePatterns: ["<rootDir>/build/"],
    coverageReporters: ["json-summary", "text", "lcov"],
    resolver: "jest-pnp-resolver",
    setupFiles: ["react-app-polyfill/jsdom", "<rootDir>/config/jest/setup.js"],
    snapshotSerializers: ["enzyme-to-json/serializer"],
    setupFilesAfterEnv: [
        "<rootDir>/src/setupTests.ts",
    ],
    testMatch: [
        "<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}",
        "<rootDir>/src/**/?(*.)(spec|test).{js,jsx,ts,tsx}"
    ],
    verbose: false,
    testEnvironment: "jsdom",
    testURL: "http://localhost",
    transform: {
        "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest",
        "^.+\\.css$": "<rootDir>/config/jest/cssTransform.js",
        "^(?!.*\\.(js|jsx|ts|tsx|css|json)$)":
            "<rootDir>/config/jest/fileTransform.js"
    },
    // moduleNameMapper: {
    //     'styled-components': '<rootDir>/node_modules/styled-components'
    //   },
    transformIgnorePatterns: [
        "[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx)$",
        "^.+\\.module\\.(css|sass|scss)$"
    ],
    moduleFileExtensions: [
        "web.js",
        "js",
        "web.ts",
        "ts",
        "web.tsx",
        "tsx",
        "json",
        "web.jsx",
        "jsx",
        "node"
    ],
    watchPlugins: [
        "<rootDir>/node_modules/jest-watch-typeahead/filename.js",
        "<rootDir>/node_modules/jest-watch-typeahead/testname.js"
    ]
  };
  