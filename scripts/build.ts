import * as path from 'path';
import {build as esbuild, BuildOptions} from 'esbuild';

const baseOptions: BuildOptions = {
  platform: 'node',
  target: 'esnext',
  format: 'cjs',
  nodePaths: [path.join(__dirname, '../src')],
  sourcemap: true,
  external: [],
  bundle: true,
};

async function main() {
  await esbuild({
    ...baseOptions,
    outdir: path.join(__dirname, '../build/cjs'),
    entryPoints: [path.join(__dirname, '../src/index.ts')],
  });

  await esbuild({
    ...baseOptions,
    format: 'esm',
    outdir: path.join(__dirname, '../build/esm'),
    entryPoints: [path.join(__dirname, '../src/index.ts')],
  });
}

if (require.main === module) {
  main();
}
