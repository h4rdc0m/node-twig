import * as fs from 'fs/promises';
import * as path from 'path';

async function main() {
  await Promise.all([
    rmrf('build'),
    rmrf('coverage'),
    rmrf('.nyc_output'),
  ]);
}

async function rmrf(relativePath: string): Promise<void> {
  await fs.rm(path.join(__dirname, '../', relativePath), { recursive: true, force: true });
}

if (require.main === module) {
  main();
}
