import { inject, injectable } from 'tsyringe';

import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

interface Request {
  userId: string;
}

@injectable()
class ShowUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ userId }: Request): Promise<User> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }
}

export default ShowUserService;
