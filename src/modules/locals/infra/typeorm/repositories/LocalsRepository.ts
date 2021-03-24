/* eslint-disable arrow-parens */
import { getRepository, Repository } from 'typeorm';
import { isSameDay } from 'date-fns';

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

  public async findByCity(city: string): Promise<Locals[] | undefined> {
    const local = await this.ormRepository.find({ where: { city } });

    return local;
  }

  public async findAllAndOrderByCreate(): Promise<Locals[] | undefined> {
    const findLocals = await this.ormRepository.find({
      order: { created_at: 'DESC' },
    });

    return findLocals;
  }

  public async findAllCreatedToday(): Promise<Locals[] | undefined> {
    const findLocals = await this.findAllAndOrderByCreate();

    const createdToday: Locals[] = [];

    findLocals?.forEach(local => {
      if (isSameDay(new Date(), local.created_at)) {
        createdToday.push(local);
      }
    });

    return createdToday;
  }

  public async findMostPopularLocals(): Promise<Locals[] | undefined> {
    const findLocals = await this.ormRepository.find({
      order: { count: 'DESC' },
    });

    return findLocals;
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

    await this.ormRepository.save(local);

    return local;
  }

  public async save(local: Locals): Promise<Locals> {
    return this.ormRepository.save(local);
  }
}

export default LocalsRepository;
