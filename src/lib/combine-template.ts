import { glob } from 'glob';
import fs from 'fs/promises';

export interface Metadata {
  template?: string;
  title?: string;
  scripts?: string[];
  stylesheets?: string[];
}

export const combineTemplate = async (
  metadata: Metadata,
  content: string,
  inputPath: string,
): Promise<string> => {
  if (!metadata.template) {
    throw new Error('Missing Template!');
  }

  const templates = await glob(`${inputPath}/templates/*.html`);
  const template = templates.find((template) =>
    template.includes(metadata.template),
  );

  if (!template) {
    throw new Error(`${metadata.template} does not exist`);
  }

  const templateContent: string = (await fs.readFile(template)).toString();

  if (!templateContent) {
    throw new Error(`Cannot read ${templateContent}`);
  }

  const header = `
    <title>${metadata.title || 'Cozy Stack'}</title>
    ${metadata.scripts?.map(
      (script) =>
        `<script src="/scripts/${script
          .replace('.js', '.min.js')
          .replace('.ts', '.min.js')}"></script>`,
    )}
    ${metadata.stylesheets?.map(
      (stylesheet) =>
        `<link href="/styles/${stylesheet.replace(
          'scss',
          'css',
        )}" rel="stylesheet" />`,
    )}
  `;

  return templateContent.replace('{body}', content).replace('{head}', header);
};
