import * as path from 'path';

export const storageDir = () => {
  return path.join(__dirname, '../../storage');
};

path.join(storageDir(), 'photos');
