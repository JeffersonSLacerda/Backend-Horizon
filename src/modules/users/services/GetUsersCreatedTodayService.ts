import { inject, injectable } from 'tsyringe';

import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

@injectable()
class GetUsersCreatedTodayService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(): Promise<User[] | undefined> {
    const users = this.usersRepository.findAllCreatedToday();

    return users;
  }
}

export default GetUsersCreatedTodayService;
