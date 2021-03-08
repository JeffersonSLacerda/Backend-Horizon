/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
import { getRepository } from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';
import Locals from '../infra/typeorm/entities/Local';

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
  profile: string;
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
    rootOrNutella,
    userId,
    profile,
    showName,
  }: Request): Promise<Locals> {
    const localsRepository = getRepository(Locals);
    const userRepository = getRepository(User);

    const user = await userRepository.findOne({
      where: {
        id: userId,
      },
    });

    const status = profile === 'admin' ? 'ok' : 'waiting';

    const checkLocalsExistAndAceppted = await localsRepository.findOne({
      where: { name, status: 'ok' },
    });

    if (checkLocalsExistAndAceppted) {
      throw new Error('Local ja cadastrado!');
    }

    const checkLocalsExistAndWaiting = await localsRepository.findOne({
      where: { name, status: 'waiting' },
    });

    if (checkLocalsExistAndWaiting) {
      throw new Error('Local ja cadastrado e esperando aprovação!');
    }

    const local = localsRepository.create({
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
      user,
      showName,
    });

    await localsRepository.save(local);

    return local;
  }
}

export default CreateLocalService;
