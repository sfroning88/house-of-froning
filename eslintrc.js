module.exports = {
  extends: ["next/core-web-vitals"],
  rules: {
    // Keep this - prevents bugs with missing dependencies in hooks
    "react-hooks/exhaustive-deps": "warn",
  },
  overrides: [
    {
      files: ["app/**/(actions)/**/*.ts"],
      rules: {
        "no-restricted-syntax": [
          "error",
          {
            selector:
              "ExportNamedDeclaration[declaration.type='FunctionDeclaration'][declaration.async=true]",
            message:
              "Exported async functions are not allowed in action files. Export consts created via create*Action wrappers instead.",
          },
          {
            selector:
              "ExportNamedDeclaration > VariableDeclaration[kind!='const']",
            message:
              "Use `export const` for values in action files; do not export `let` or `var`.",
          },
          {
            selector:
              "ExportNamedDeclaration > VariableDeclaration > VariableDeclarator[id.name=/Action$/]:not(:has(CallExpression[callee.name=/^(createPublicAction)$/]))",
            message:
              "Exported *Action values in action files must be created via an action-guard helper (createPublicAction).",
          },
          {
            selector:
              "CallExpression[callee.name='createPublicAction'][arguments.length<2]",
            message:
              "createPublicAction must be called with exactly 2 arguments: a zod schema and a handler function.",
          },
          {
            selector:
              "CallExpression[callee.name='createPublicAction'] > arguments > :first-child[type='Literal']",
            message:
              "The first argument to createPublicAction must be a zod schema, not a literal value. Use z.object({...}), z.string(), etc.",
          },
          {
            selector:
              "CallExpression[callee.name='createPublicAction'] > arguments > :first-child[type='Identifier']:not([name='z'])",
            message:
              "The first argument to createPublicAction must be a zod schema. If using a variable, ensure it's a ZodSchema type from zod.",
          },
        ],
      },
    },
  ],
};
