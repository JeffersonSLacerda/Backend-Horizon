import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';

import uploadConfig from '@config/upload';

import Locals from '@modules/locals/infra/typeorm/entities/Local';
import User from '@modules/users/infra/typeorm/entities/User';
import Picture from '@modules/locals/infra/typeorm/entities/Pictures';

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
    const userRepository = getRepository(User);

    const localRepoisitory = getRepository(Locals);

    const pictureRepository = getRepository(Picture);

    const validUser = await userRepository.findOne(userId);

    if (!validUser) {
      throw new Error('Only autenhicated user can change Locals Pictures');
    }

    const local = await localRepoisitory.findOne(localId);

    if (!local) {
      throw new Error('Invalid local');
    }

    if (local?.user.id === userId || validUser.profile.type === 'admin') {
      throw new Error(
        'User need be owner this local or admin to change pictures',
      );
    }
    const localPictures = await pictureRepository.find({
      where: {
        local: local.id,
      },
    });

    if (localPictures.length > 6) {
      const localPictureFilePath = path.join(
        uploadConfig.directory,
        localPictures[5].name,
      );
      const pictureFileExists = await fs.promises.stat(localPictureFilePath);

      if (pictureFileExists) {
        await fs.promises.unlink(localPictureFilePath);
      }
    }

    const picture = pictureRepository.create({
      name: pictureFilename,
      local,
    });

    await pictureRepository.save(picture);

    return picture;
  }
}

export default UpdatePicturesLocalsService;
