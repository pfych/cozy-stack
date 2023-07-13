import * as path from 'path';
import { glob } from 'glob';
import { marked } from 'marked';
import fs from 'fs/promises';
import { combineTemplate } from './combine-template';

export const buildContent = async (
  input: string,
  output: string,
): Promise<void> => {
  const inputPath = path.resolve(input);
  const outputPath = path.resolve(output);

  const allFiles = await glob(`${inputPath}/content/**/*.*`);
  await Promise.all(
    allFiles.map((file) =>
      fs.mkdir(
        file
          .replace(path.join(inputPath, 'content'), outputPath)
          .split('/')
          .filter((section) => !section.includes('.'))
          .join('/'),
        { recursive: true },
      ),
    ),
  );

  const markdownFiles = allFiles
    .filter((file) => file.includes('.md'))
    .map((file) => file.replace(path.join(inputPath, 'content'), ''));

  await Promise.all(
    markdownFiles.map(async (file) => {
      const content = (
        await fs.readFile(path.join(path.join(inputPath, 'content'), file))
      ).toString();
      const metaString = content.split('---');

      if (!metaString[1]) {
        throw new Error(`${file} missing metadata!`);
      }

      const metaArray = metaString[1].split('\n').filter((line) => line);
      const metadata = metaArray.reduce(
        (prev, current) => ({
          ...prev,
          [current.split(':')[0]]: current.replace(/^.*: /, ''),
        }),
        {},
      );

      metadata['scripts'] = metadata['scripts']?.split(' ');
      metadata['stylesheets'] = metadata['stylesheets']?.split(' ');

      const contentWithoutMeta = metaString.slice(2).join('---');
      const html = await marked.parse(contentWithoutMeta, {
        async: true,
        mangle: false,
        headerIds: false,
      });

      const htmlInTemplate = await combineTemplate(metadata, html, inputPath);

      await fs.writeFile(
        path.join(outputPath, file.replace('.md', '.html')),
        htmlInTemplate,
      );
    }),
  );
};
