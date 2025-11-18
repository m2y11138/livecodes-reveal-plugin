const esbuild = require("esbuild");
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname + "/..");
const outDir = path.resolve(root, "build");

const copyFile = async (filePath, outputName) => {
  const src = path.resolve(root, filePath);
  const dist = path.resolve(outDir, outputName);
  fs.mkdirSync(path.dirname(dist), { recursive: true });
  let content = await fs.promises.readFile(src, "utf8");
  fs.writeFileSync(dist, content, "utf8");
};

const baseOptions = {
  entryPoints: ["src/reveal.ts"],
  bundle: true,
  target: "es2020",
};

const buildSdk = async () => {
  await Promise.all([
    copyFile("LICENSE", "LICENSE"),
    copyFile("README.md", "README.md"),
    copyFile("package.json", "package.json"),
  ]);
  return Promise.all([
    esbuild.build({
      ...baseOptions,
      outdir: undefined,
      outfile: path.resolve(outDir, "reveal.umd.js"),
      format: "iife",
    }),
    esbuild.build({
      ...baseOptions,
      outdir: undefined,
      outfile: path.resolve(outDir, "reveal.js"),
    }),
  ]);
};

buildSdk().catch((err) => {
  console.error(err);
  process.exit(1);
});
