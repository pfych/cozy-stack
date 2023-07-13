import path from 'path';
import { glob } from 'glob';
import sass from 'sass';
import fs from 'fs/promises';

export const buildCSS = async (
  input: string,
  output: string,
): Promise<void> => {
  const inputPath = path.resolve(input);
  const outputPath = path.resolve(output);

  await fs.mkdir(path.join(outputPath, 'styles'), { recursive: true });

  const allFiles = (await glob(`${inputPath}/styles/*.scss`)).map((file) =>
    file.replace(inputPath, ''),
  );

  await Promise.all(
    allFiles.map(async (file) => {
      const css = (await sass.compileAsync(path.join(inputPath, file))).css;

      await fs.writeFile(
        path.join(outputPath, file).replace('.scss', '.css'),
        css,
      );
    }),
  );
};
