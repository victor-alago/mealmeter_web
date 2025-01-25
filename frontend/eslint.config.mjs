import globals from "globals";
import react from "eslint-plugin-react";
import importPlugin from "eslint-plugin-import";
import babelParser from "@babel/eslint-parser";

export default [
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: {
      parser: babelParser,
      parserOptions: {
        requireConfigFile: false,
        babelOptions: {
          presets: ['@babel/preset-react']
        },
        ecmaVersion: 2020,
        sourceType: "module",
        ecmaFeatures: {
          jsx: true
        }
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jest,
        require: "readonly"
      }
    },
    plugins: {
      react,
      import: importPlugin
    },
    rules: {
      "no-undef": "error",
      "no-dupe-args": "error",
      "no-dupe-keys": "error",
      "react/jsx-uses-vars": "error",
      "react/jsx-no-undef": "error",
      
    },
    settings: {
      react: {
        version: "detect"
      }
    }
  }
];