import { startOfDay, endOfDay, getHours } from 'date-fns';

import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import OperationsRepository from '../infra/typeorm/repositories/OperationsRepository';

interface Request {
  day: 'sun' | 'mon' | 'tue' | 'wen' | 'thu' | 'fri' | 'sat';
  openTime?: number;
  closeTime?: number;
  price?: number;
  isAllDay?: boolean;
  localId: string;
  userId: string;
}

class CreateOperationsService {
  public async execute({
    day,
    openTime,
    closeTime,
    price,
    isAllDay,
    localId,
    userId,
  }: Request) {
    const operationsRepository = new OperationsRepository();
    const userRepository = new UsersRepository();

    const validUser = await userRepository.findById(userId);

    if (!validUser) {
      throw new Error('Only autenhicated user can change Locals Pictures');
    }

    if (isAllDay) {
      // eslint-disable-next-line no-param-reassign
      openTime = getHours(startOfDay(new Date())) as number;
      // eslint-disable-next-line no-param-reassign
      closeTime = getHours(endOfDay(new Date())) as number;
    }

    const operation = await operationsRepository.create({
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
