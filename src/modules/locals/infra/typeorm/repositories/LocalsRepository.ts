import { getRepository, Repository } from 'typeorm';

import ILocalsRepository from '@modules/locals/repositories/ILocalsRepository';
import ICreateLocalDTO from '@modules/locals/dtos/ICreateLocalDTO';
import Locals from '../entities/Local';

class LocalsRepository implements ILocalsRepository {
  private ormRepository: Repository<Locals>;

  constructor() {
    this.ormRepository = getRepository(Locals);
  }

  public async create({
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
  }: ICreateLocalDTO): Promise<Locals> {
    const locals = this.ormRepository.create({
      city,
      state,
      name,
      cep,
      street,
      number,
      district,
      link,
      rootOrNutella,
      user,
      showName,
    });
  }
}

export default LocalsRepository;
