
import { build } from "esbuild";
const config = {
    bundle: true,
    metafile: true,
    sourcemap: true,
    target: "es5",
    format: "esm",
    splitting: true,
    resolveExtensions: [".js"],
    logLevel: "error",
    outdir: "dist/esbuild",
    define: { "IS_DEBUG": "false" },
    entryPoints: ["./dist/ts/index.js"]
};
build(config);