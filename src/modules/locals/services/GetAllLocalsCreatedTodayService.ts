import { inject, injectable } from 'tsyringe';

import Locals from '../infra/typeorm/entities/Local';
import ILocalsRepository from '../repositories/ILocalsRepository';

@injectable()
class GetAllLocalsCreatedTodayService {
  constructor(
    @inject('LocalsRepository')
    private loacalsRepository: ILocalsRepository,
  ) {}

  public async execute(): Promise<Locals[] | undefined> {
    const locals = this.loacalsRepository.findAllCreatedToday();

    return locals;
  }
}

export default GetAllLocalsCreatedTodayService;
