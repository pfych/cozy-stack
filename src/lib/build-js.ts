import path from 'path';
import { glob } from 'glob';
import fs from 'fs/promises';
import { exec } from 'child_process';

export const buildJS = async (input: string, output: string): Promise<void> => {
  const inputPath = path.resolve(input);
  const outputPath = path.resolve(output);

  await fs.mkdir(path.join(outputPath, 'scripts'), { recursive: true });

  const allFiles = (await glob(`${inputPath}/scripts/*.ts`)).map((file) =>
    file.replace(inputPath, ''),
  );

  allFiles.forEach((file) => {
    console.log(`Bundling ${file}`);

    /** @TODO investigate better esbuild bundling! */
    exec(
      `npx esbuild ${path.join(
        inputPath,
        file,
      )} --platform=browser --bundle --external:esbuild --outfile=${path
        .join(outputPath, file)
        .replace('.ts', '.min.js')}`,
      (error, stdout, stderr) => {
        if (error) {
          console.error(stderr);
          throw new Error(error.message);
        }
      },
    );
  });
};
