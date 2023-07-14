import fs from 'fs/promises';
import path from 'path';

export const initProject = async (location: string): Promise<void> => {
  console.log(`Attempting to create project at ${location}...`);

  await fs.mkdir(path.resolve(location), { recursive: true });
  await fs.cp(
    path.resolve(__dirname, '..', 'src', 'lib', 'init', 'base'),
    location,
    { recursive: true },
  );

  console.log('Done!');
};
