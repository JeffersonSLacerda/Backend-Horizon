import ICreateOperationsDTO from '@modules/locals/dtos/ICreateOperationsDTO';
import IOperationsRepository from '@modules/locals/repositories/IOperationsRepository';
import { getRepository, Repository } from 'typeorm';
import Locals from '../entities/Local';
import Operations from '../entities/Operations';
import LocalsRepository from './LocalsRepository';

class OperationsRepository implements IOperationsRepository {
  private ormRepository: Repository<Operations>;

  constructor() {
    this.ormRepository = getRepository(Operations);
  }

  public async create({
    day,
    openTime,
    closeTime,
    price,
    localId,
  }: ICreateOperationsDTO): Promise<Operations> {
    const localsRepository = new LocalsRepository();
    const local = await localsRepository.findById(localId);

    const operations = this.ormRepository.create({
      day,
      openTime,
      closeTime,
      price,
      local: local as Locals,
    });

    await this.ormRepository.save(operations);

    return operations;
  }
}

export default OperationsRepository;
