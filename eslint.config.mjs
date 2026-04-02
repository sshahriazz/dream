import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettier from "eslint-config-prettier";

// Custom rule: enforce `weight` prop on Phosphor icon components
const phosphorPlugin = {
  rules: {
    "require-weight-prop": {
      meta: {
        type: "suggestion",
        docs: {
          description:
            "Require explicit `weight` prop on Phosphor icon components for consistent styling",
        },
        messages: {
          missingWeight:
            'Phosphor icon <{{name}}> is missing the `weight` prop. Add weight="duotone" (or another explicit weight).',
        },
        schema: [],
      },
      create(context) {
        const phosphorImports = new Set();

        return {
          ImportDeclaration(node) {
            if (!node.source.value.startsWith("@phosphor-icons/react")) return;
            for (const spec of node.specifiers) {
              if (
                spec.type === "ImportSpecifier" ||
                spec.type === "ImportDefaultSpecifier"
              ) {
                phosphorImports.add(spec.local.name);
              }
            }
          },
          JSXOpeningElement(node) {
            const name =
              node.name.type === "JSXIdentifier" ? node.name.name : null;
            if (!name || !phosphorImports.has(name)) return;
            if (name === "IconContext" || name === "IconBase") return;

            const hasWeight = node.attributes.some(
              (attr) =>
                attr.type === "JSXAttribute" && attr.name.name === "weight"
            );

            if (!hasWeight) {
              context.report({
                node,
                messageId: "missingWeight",
                data: { name },
              });
            }
          },
        };
      },
    },
  },
};

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
  prettier,
  {
    plugins: {
      phosphor: phosphorPlugin,
    },
    rules: {
      "phosphor/require-weight-prop": "warn",

      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "@phosphor-icons/react/ssr",
              message:
                "Import from '@phosphor-icons/react' instead. Next.js optimizePackageImports handles tree-shaking automatically.",
            },
          ],
        },
      ],
    },
  },
]);

export default eslintConfig;
