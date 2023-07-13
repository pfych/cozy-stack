import * as path from 'path';
import { glob } from 'glob';
import { marked } from 'marked';
import fs from 'fs/promises';

export const buildContent = async (
  input: string,
  output: string,
): Promise<void> => {
  const inputPath = path.resolve(input);
  const outputPath = path.resolve(output);

  const allFiles = await glob(`${inputPath}/**/*.*`);
  const markdownFiles = allFiles
    .filter((file) => file.includes('.md'))
    .map((file) => file.replace(inputPath, ''));

  await Promise.all(
    markdownFiles.map(async (file) => {
      const content = (
        await fs.readFile(path.join(inputPath, file))
      ).toString();
      const metaString = content.split('---');

      if (!metaString[1]) {
        console.error(`ERROR: ${file} missing metadata!`);
        return;
      }

      const metaArray = metaString[1].split('\n').filter((line) => line);
      const metadata = metaArray.reduce(
        (prev, current) => ({
          ...prev,
          [current.split(':')[0]]: current.replace(/^.*: /, ''),
        }),
        {},
      );

      const contentWithoutMeta = metaString.slice(2).join('---');
      const html = await marked.parse(contentWithoutMeta, {
        async: true,
        mangle: false,
        headerIds: false,
      });

      await fs.writeFile(
        path.join(outputPath, file.replace('.md', '.html')),
        html,
      );
    }),
  );
};
