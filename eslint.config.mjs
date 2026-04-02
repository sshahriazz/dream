import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettier from "eslint-config-prettier";

// Custom rule: prevent Phosphor icons from using weight="regular"
// since the global IconProvider sets weight="duotone" as default.
// Using "regular" would override the default inconsistently —
// if you need regular weight, it's likely an oversight.
const phosphorPlugin = {
  rules: {
    "no-regular-weight": {
      meta: {
        type: "suggestion",
        docs: {
          description:
            'Prevent Phosphor icons from using weight="regular" since the app default is "duotone" via IconContext',
        },
        messages: {
          noRegularWeight:
            'Phosphor icon <{{name}}> uses weight="regular". The global default is "duotone" via IconProvider — remove the weight prop to use the default, or use a different weight.',
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

            const weightAttr = node.attributes.find(
              (attr) =>
                attr.type === "JSXAttribute" && attr.name.name === "weight"
            );

            if (
              weightAttr &&
              weightAttr.value &&
              weightAttr.value.type === "Literal" &&
              weightAttr.value.value === "regular"
            ) {
              context.report({
                node,
                messageId: "noRegularWeight",
                data: { name },
              });
            }
          },
        };
      },
    },
  },
};

const eslintConfig = [
  ...nextVitals,
  ...nextTs,
  { ignores: [".next/**", "out/**", "build/**", "next-env.d.ts"] },
  prettier,
  {
    plugins: {
      phosphor: phosphorPlugin,
    },
    rules: {
      "phosphor/no-regular-weight": "warn",

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
];

export default eslintConfig;
