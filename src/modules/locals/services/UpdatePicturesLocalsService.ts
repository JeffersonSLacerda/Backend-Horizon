import path from 'path';
import fs from 'fs';
import { inject, injectable } from 'tsyringe';

import uploadConfig from '@config/upload';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IStorageProvider from '@shared/container/providers/SttorageProvider/models/IStorageProvider';
import ILocalsRepository from '../repositories/ILocalsRepository';
import IPicturesRepository from '../repositories/IPicturesRepository';

interface Request {
  localId: string;
  userId: string;
  pictureFilename: string;
}

@injectable()
class UpdatePicturesLocalsService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('LocalsRepository')
    private localsRepository: ILocalsRepository,

    @inject('PicturesRepository')
    private picturesRepository: IPicturesRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({
    localId,
    userId,
    pictureFilename,
  }: Request): Promise<string> {
    const validUser = await this.usersRepository.findById(userId);

    if (!validUser) {
      throw new Error('Only autenhicated user can change Locals Pictures');
    }

    const local = await this.localsRepository.findById(localId);

    if (!local) {
      throw new Error('Invalid local');
    }

    if (local?.user.id === userId || validUser.profile.type === 'admin') {
      throw new Error(
        'User need be owner this local or admin to change pictures',
      );
    }
    const localPictures = await this.picturesRepository.findAllPicturesToCurrentLocal(
      local.id,
    );

    if (localPictures) {
      if (localPictures?.length > 6) {
        const localPictureFilePath = path.join(
          uploadConfig.tmpFolder,
          localPictures[5].name,
        );
        const pictureFileExists = await fs.promises.stat(localPictureFilePath);

        if (pictureFileExists) {
          await this.storageProvider.deleteFile(localPictureFilePath);
        }
      }
    }

    const picture = await this.storageProvider.saveFile(pictureFilename);
    return picture;
  }
}

export default UpdatePicturesLocalsService;
