import { getRepository } from 'typeorm';

import Operations from '../infra/typeorm/entities/Operations';
import Locals from '../infra/typeorm/entities/Local';

interface Request {
  days: 'sun' | 'mon' | 'tue' | 'wen' | 'thu' | 'fri' | 'sat';
  openTime: string;
  closeTime: string;
  price?: number;
  picturesFilenames: string[];
  localId: string;
}

class CreateOperationsService {
  public async execute({
    days,
    openTime,
    closeTime,
    price,
    pictures,
    localId,
  }: Request) {
    const operationsRepository = getRepository(Operations);
    const localsRepository = getRepository(Locals);
  }
}

export default CreateOperationsService;
