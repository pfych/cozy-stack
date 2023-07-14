import path from 'path';
import { glob } from 'glob';
import esbuild from 'esbuild';
import fs from 'fs/promises';

export const buildJS = async (input: string, output: string): Promise<void> => {
  const inputPath = path.resolve(input);
  const outputPath = path.resolve(output);

  await fs.mkdir(path.join(outputPath, 'scripts'), { recursive: true });

  const allFiles = (await glob(`${inputPath}/scripts/*.ts`)).map((file) =>
    file.replace(inputPath, ''),
  );

  await Promise.all(
    allFiles.map(async (file) => {
      console.log(`Compiling ${path.join(inputPath, file)}`);
      await esbuild.build({
        entryPoints: [path.join(inputPath, file)],
        minify: true,
        platform: 'browser',
        outfile: path.join(outputPath, file).replace('.ts', '.min.js'),
      });
    }),
  );
};
