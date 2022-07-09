import * as path from 'path';
import * as mime from 'mime';
import { diskStorage } from 'multer';
import { v4 } from 'uuid';

export const storageDir = () => {
  return path.join(__dirname, '../../storage');
};

path.join(storageDir(), 'photos');

export function multerStorage(dest: string) {
  return diskStorage({
    destination: (req, file, cb) => cb(null, dest),
    filename: (req, file, cb) => {
      cb(null, `${v4()}.${(mime as any).getExtension(file.mimetype)}`);
    },
  });
}
