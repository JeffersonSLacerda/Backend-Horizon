/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
import User from '@modules/users/infra/typeorm/entities/User';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import Locals from '../infra/typeorm/entities/Local';
import LocalsRepository from '../infra/typeorm/repositories/LocalsRepository';

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

class CreateLocalService {
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
    const localsRepository = new LocalsRepository();
    const usersRepository = new UsersRepository();

    const situation = await localsRepository.checkState(name);

    if (situation) {
      throw new Error(situation);
    }

    const findUser = await usersRepository.findById(userId);

    if (!findUser) {
      throw new Error('User not exist');
    }

    if (findUser.profile.type !== 'admin') {
      throw new Error('User not have permition');
    }

    const local = await localsRepository.create({
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
