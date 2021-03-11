import path from 'path';
import crypto from 'crypto';
import multer from 'multer';

const tampfolder = path.resolve(__dirname, '..', '..', 'tmp');

export default {
  directory: tampfolder,

  storage: multer.diskStorage({
    destination: tampfolder,
    filename(request, file, callback) {
      const fileHash = crypto.randomBytes(10).toString('hex');
      const fileName = `${fileHash}-${file.originalname}`;

      return callback(null, fileName);
    },
  }),
};
