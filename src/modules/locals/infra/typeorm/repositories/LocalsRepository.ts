import { getRepository, Repository } from 'typeorm';

import ILocalsRepository from '@modules/locals/repositories/ILocalsRepository';
import ICreateLocalDTO from '@modules/locals/dtos/ICreateLocalDTO';
import Locals from '../entities/Local';

class LocalsRepository implements ILocalsRepository {
  private ormRepository: Repository<Locals>;

  constructor() {
    this.ormRepository = getRepository(Locals);
  }

  public async findById(id: string): Promise<Locals | undefined> {
    const local = await this.ormRepository.findOne(id);

    return local;
  }

  public async checkState(name: string): Promise<string | undefined> {
    const local = await this.ormRepository.findOne({ where: { name } });

    if (local?.status === 'ok') return 'Local já cadastrado';

    if (local?.status === 'waiting') {
      return 'Local já cadastrado e aguadando aprovação';
    }

    return undefined;
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
    user,
    showName,
  }: ICreateLocalDTO): Promise<Locals> {
    const local = this.ormRepository.create({
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

    return local;
  }
}

export default LocalsRepository;
