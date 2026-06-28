import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "https://backend.reachdigital.dev/graphql",
  documents: ["graphql/**/*.graphql"],
  generates: {
    "./src/gql/": {
      preset: "client",
    },
    "gql/types.ts": {
      plugins: ["typescript"],
    },
    "graphql/": {
      preset: "near-operation-file",
      presetConfig: {
        extension: ".generated.ts",
        baseTypesPath: "../gql/types.ts",
      },
      plugins: ["typescript-operations", "typed-document-node"],
    },
    "./schema.graphql": {
      plugins: ["schema-ast"],
    },
    "./schema.json": {
      plugins: ["introspection"],
      config: {
        minify: false,
      },
    },
  },
};
export default config;
