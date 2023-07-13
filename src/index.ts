import minimist from 'minimist';
import { buildContent } from './lib/build-content';
import fs from 'fs/promises';
const _argv = minimist(process.argv.slice(0));

(async () => {
  // avoid casting _argv
  const argv = {
    i: _argv.i,
    o: _argv.o,
    port: _argv.port,
    bind: _argv.bind,
  };

  if (!argv.i) {
    console.error('ERROR: No provided target folder!');
    return;
  }

  if (!argv.o) {
    console.error('ERROR: No provided output folder!');
    return;
  }

  const inputFolder = await fs.stat(argv.i);

  if (!inputFolder) {
    console.error(`ERROR: Path ${argv.i} does not exist`);
  }

  await buildContent(argv.i, argv.o);
})();
