import minimist from 'minimist';
import { buildContent } from './lib/build-content';
import fs from 'fs/promises';
import { buildCSS } from './lib/build-css';
import { buildJS } from './lib/build-js';
import { initProject } from './lib/init/init-project';
const _argv = minimist(process.argv.slice(0));

(async () => {
  try {
    if (_argv.h) {
      console.log('Usage: npx cozy-stack [options]\n');
      console.log('Options:');
      console.log('-o     output directory');
      console.log('-i     input directory');
      console.log('\n');
    }

    if (_argv.init) {
      await initProject(_argv.init);
      return;
    }

    // avoid casting _argv
    const argv = {
      i: _argv.i,
      o: _argv.o,
      port: _argv.port,
      bind: _argv.bind,
    };

    if (!argv.i) {
      throw new Error('No provided target folder!');
    }

    if (!argv.o) {
      throw new Error('No provided output folder!');
    }

    const inputFolder = await fs.stat(argv.i);

    if (!inputFolder) {
      throw new Error(`ERROR: Path ${argv.i} does not exist`);
    }

    await buildJS(argv.i, argv.o);
    await buildCSS(argv.i, argv.o);
    await buildContent(argv.i, argv.o);
  } catch (e) {
    console.error('FATAL ERROR:');
    console.error(e.message);
  }
})();
