// @ts-check
import eslint from "@eslint/js";
import angular from "angular-eslint";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";

export default defineConfig([
    {
        files: ["**/*.ts"],
        extends: [
            eslint.configs.recommended,
            ...tseslint.configs.recommended,
            ...tseslint.configs.stylistic,
            angular.configs.tsRecommended,
        ],
        processor: angular.processInlineTemplates,
        rules: {
            "@typescript-eslint/consistent-type-definitions": ["error", "type"],
            "@typescript-eslint/consistent-type-imports": ["error", { prefer: "type-imports" }],
            "@angular-eslint/directive-selector": [
                "error",
                {
                    type: "attribute",
                    prefix: "kanbano",
                    style: "camelCase",
                },
            ],

            "@angular-eslint/component-selector": [
                "error",
                {
                    type: "element",
                    prefix: "kanbano",
                    style: "kebab-case",
                },
            ],
        },
    },
    {
        files: ["src/app/**/domain/**/*.gateway.ts"],
        rules: {
            "@typescript-eslint/consistent-type-definitions": ["error", "interface"],
        },
    },
    {
        files: ["**/*.html"],
        extends: [angular.configs.templateRecommended, angular.configs.templateAccessibility],
        rules: {},
    },
]);
