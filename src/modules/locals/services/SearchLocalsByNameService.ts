import { inject, injectable } from 'tsyringe';

import Locals from '../infra/typeorm/entities/Local';

import ILocalsRepository from '../repositories/ILocalsRepository';

@injectable()
class SearchLocalsByNameService {
  constructor(
    @inject('LocalsRepository')
    private localsRepository: ILocalsRepository,
  ) {}

  public async execute(name: string): Promise<Locals[] | undefined> {
    const locals = this.localsRepository.findByName(name);

    return locals;
  }
}

export default SearchLocalsByNameService;
