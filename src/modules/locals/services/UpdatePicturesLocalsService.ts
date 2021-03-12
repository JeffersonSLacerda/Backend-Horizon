import path from 'path';
import fs from 'fs';

import uploadConfig from '@config/upload';

import Picture from '@modules/locals/infra/typeorm/entities/Pictures';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import LocalsRepository from '../infra/typeorm/repositories/LocalsRepository';
import PicturesRepository from '../infra/typeorm/repositories/PicturesRepository';

interface Request {
  localId: string;
  userId: string;
  pictureFilename: string;
}

class UpdatePicturesLocalsService {
  public async execute({
    localId,
    userId,
    pictureFilename,
  }: Request): Promise<Picture> {
    const userRepository = new UsersRepository();

    const localRepoisitory = new LocalsRepository();

    const pictureRepository = new PicturesRepository();

    const validUser = await userRepository.findById(userId);

    if (!validUser) {
      throw new Error('Only autenhicated user can change Locals Pictures');
    }

    const local = await localRepoisitory.findById(localId);

    if (!local) {
      throw new Error('Invalid local');
    }

    if (local?.user.id === userId || validUser.profile.type === 'admin') {
      throw new Error(
        'User need be owner this local or admin to change pictures',
      );
    }
    const localPictures = await pictureRepository.findAllPicturesToCurrentLocal(
      local.id,
    );

    if (localPictures) {
      if (localPictures?.length > 6) {
        const localPictureFilePath = path.join(
          uploadConfig.directory,
          localPictures[5].name,
        );
        const pictureFileExists = await fs.promises.stat(localPictureFilePath);

        if (pictureFileExists) {
          await fs.promises.unlink(localPictureFilePath);
        }
      }
    }

    const picture = await pictureRepository.create(pictureFilename, local.id);
    return picture;
  }
}

export default UpdatePicturesLocalsService;
