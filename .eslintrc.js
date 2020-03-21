const path = require('path');
module.exports = {
  "extends": "airbnb",
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaVersion": 2017,
    "ecmaFeatures": {
      "jsx": true,
    }
  },
  "plugins": [
    "react",
    "jsx-a11y",
    "import",
    "jest"
  ],
  "env": {
    "browser": true,
    "jest": true
  },
  "overrides": [{
      "files": ["tests/jest/**/*"],
      "plugins": [
        "jest"
      ],
      "rules": {
        "jest/lowercase-name": [
          "error",
          {
            "ignore": ["describe"]
          }
        ],
        "jest/no-alias-methods": "error",
        "jest/no-disabled-tests": "error",
        "jest/no-focused-tests": "error",
        "jest/no-identical-title": "error",
        "jest/no-jest-import": "error",
        "jest/no-test-prefixes": "error",
        "jest/no-test-return-statement": "error",
        "jest/prefer-strict-equal": "error",
        "jest/prefer-to-be-null": "error",
        "jest/prefer-to-be-undefined": "error",
        "jest/prefer-to-contain": "error",
        "jest/prefer-to-have-length": "error",
        "jest/no-test-callback": "error",
        "jest/require-to-throw-message": "error",
        "jest/valid-describe": "error",
        "jest/valid-expect-in-promise": "error",
        "jest/valid-expect": "error",
      },
      "globals": {
        "shallow": true,
        "render": true,
        "mount": true
      },
    },
    {
      "files": ["tests/wdio/**/*"],
      "globals": {
        "browser": true,
        "Terra": true,
        "before": true,
        "after": true,
        "beforeEach": true
      },
    }
  ],
  "rules": {
    "import/prefer-default-export": "off",
    "react/jsx-fragments": "off",
    "jsx-a11y/anchor-is-valid": ["error", {
      "components": ["Link"],
      "specialLink": ["to", "hrefLeft", "hrefRight"],
      "aspects": ["noHref", "invalidHref", "preferButton"]
    }],
    "lines-between-class-members": ["error", "always", {
      "exceptAfterSingleLine": true
    }],
    "max-len": [
      2,
      130,
      {
        "ignoreComments": true,
        "ignoreStrings": false
      }
    ],
    "no-multi-assign": "off",
    "object-curly-newline": ["error", {
      "multiline": true
    }],
    "operator-linebreak": ["error", "after"],
    "react/require-default-props": "off",
    "no-use-before-define": ["error", {
      "functions": false
    }]
  },
  "settings": {
    "import/resolver": {
      alias: {
        map: [
          ['alerts', path.resolve(__dirname, './src/bundles/alerts')],
          ['common', path.resolve(__dirname, './src/common')],
        ],
        extensions: ['.js', '.jsx', '.json']
      }
    }
  }
};
