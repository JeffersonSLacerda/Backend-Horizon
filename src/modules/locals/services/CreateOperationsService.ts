import { startOfDay, endOfDay, getHours } from 'date-fns';
import { inject, injectable } from 'tsyringe';

import IOperationsRepository from '../repositories/IOperationsRepository';

interface Request {
  day: 'sun' | 'mon' | 'tue' | 'wen' | 'thu' | 'fri' | 'sat';
  openTime?: number;
  closeTime?: number;
  price?: number;
  isAllDay?: boolean;
  localId: string;
}

@injectable()
class CreateOperationsService {
  constructor(
    @inject('OperationsRepository')
    private operationsRepository: IOperationsRepository,
  ) {}

  public async execute({
    day,
    openTime,
    closeTime,
    price,
    isAllDay,
    localId,
  }: Request) {
    if (isAllDay) {
      // eslint-disable-next-line no-param-reassign
      openTime = getHours(startOfDay(new Date())) as number;
      // eslint-disable-next-line no-param-reassign
      closeTime = getHours(endOfDay(new Date())) as number;
    }

    const operation = await this.operationsRepository.create({
      day,
      openTime,
      closeTime,
      price,
      localId,
    });

    return operation;
  }
}

export default CreateOperationsService;
