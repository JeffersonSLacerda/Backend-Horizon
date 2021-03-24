import { inject, injectable } from 'tsyringe';

import Locals from '../infra/typeorm/entities/Local';
import ILocalsRepository from '../repositories/ILocalsRepository';

@injectable()
class GetAllLocalsOrderByCreateService {
  constructor(
    @inject('LocalsRepository')
    private loacalsRepository: ILocalsRepository,
  ) {}

  public async execute(): Promise<Locals[] | undefined> {
    const locals = this.loacalsRepository.findAllAndOrderByCreate();

    return locals;
  }
}

export default GetAllLocalsOrderByCreateService;
