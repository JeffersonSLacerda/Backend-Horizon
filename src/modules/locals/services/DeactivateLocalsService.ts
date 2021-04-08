import { inject, injectable } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import { DeleteResult } from 'typeorm';
import ILocalsRepository from '../repositories/ILocalsRepository';

interface Request {
  userId: string;
  localId: string;
}

@injectable()
class UpdateLocalsService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('LocalsRepository')
    private localsRepository: ILocalsRepository,
  ) {}

  public async execute({ localId, userId }: Request): Promise<DeleteResult> {
    const validUser = await this.usersRepository.findById(userId);

    if (!validUser) {
      throw new Error('Only autenhicated user can change Locals Pictures');
    }

    if (validUser.profile.type !== 'admin') {
      throw new Error('Permission danied');
    }

    const local = await this.localsRepository.findById(localId);

    if (!local) {
      throw new Error('Invalid local');
    }

    if (local?.user.id === userId || validUser.profile.type === 'admin') {
      throw new Error(
        'User need be owner this local or admin to update locals',
      );
    }

    return this.localsRepository.delete(local);
  }
}

export default UpdateLocalsService;
