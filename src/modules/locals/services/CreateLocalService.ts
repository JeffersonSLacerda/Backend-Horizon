/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
import { inject, injectable } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import Locals from '../infra/typeorm/entities/Local';
import ILocalsRepository from '../repositories/ILocalsRepository';

interface Request {
  city: string;
  state: string;
  name: string;
  cep: string;
  street: string;
  number: string;
  district: string;
  link?: string;
  rootOrNutella: boolean;
  status: 'ok' | 'waiting' | 'refused';
  userId: string;
  showName: boolean;
}

@injectable()
class CreateLocalService {
  constructor(
    @inject('LocalsRepository')
    private localsRepository: ILocalsRepository,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    city,
    state,
    name,
    cep,
    street,
    number,
    district,
    link,
    status,
    rootOrNutella,
    userId,
    showName,
  }: Request): Promise<Locals> {
    const situation = await this.localsRepository.checkState(name);

    if (situation) {
      throw new Error(situation);
    }

    const findUser = await this.usersRepository.findById(userId);

    if (!findUser) {
      throw new Error('User not exist');
    }

    if (findUser.profile.type !== 'admin') {
      throw new Error('User not have permition');
    }

    const local = await this.localsRepository.create({
      city,
      state,
      name,
      cep,
      street,
      number,
      district,
      rootOrNutella,
      status,
      link,
      user: findUser as User,
      showName,
    });

    return local;
  }
}

export default CreateLocalService;
