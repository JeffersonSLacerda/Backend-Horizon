import { injectable, inject } from 'tsyringe';

import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

@injectable()
class SeachUsersByNameService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUsersRepository,
  ) {}

  public async execute(name: string): Promise<User[] | undefined> {
    const users = this.userRepository.findByName(name);

    return users;
  }
}

export default SeachUsersByNameService;
