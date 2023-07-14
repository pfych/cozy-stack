import fs from 'fs/promises';
import path from 'path';
import { exec } from 'child_process';

export const initProject = async (location: string): Promise<void> => {
  console.log(`Attempting to create project at ${location}...`);

  await fs.mkdir(path.resolve(location), { recursive: true });
  await fs.cp(
    path.resolve(__dirname, '..', 'src', 'lib', 'init', 'base'),
    location,
    { recursive: true },
  );

  exec(`cd ${location}`);
  exec(`pnpm install`);
  exec(`git init`);

  console.log('Done!');
  console.log(`Project build to ${location}!`);
};
