import { getRepository } from 'typeorm';
import { startOfDay, endOfDay, getHours } from 'date-fns';

import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import Operations from '../infra/typeorm/entities/Operations';
import Locals from '../infra/typeorm/entities/Local';

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
    const operationsRepository = getRepository(Operations);
    const localsRepository = getRepository(Locals);
    const userRepository = new UsersRepository();

    const local = await localsRepository.findOne({ where: { id: localId } });

    const validUser = await userRepository.findById(userId);

    if (!validUser) {
      throw new Error('Only autenhicated user can change Locals Pictures');
    }

    if (!local) {
      throw new Error('This locals do not exist');
    }

    if (isAllDay) {
      // eslint-disable-next-line no-param-reassign
      openTime = getHours(startOfDay(new Date())) as number;
      // eslint-disable-next-line no-param-reassign
      closeTime = getHours(endOfDay(new Date())) as number;
    }

    const operation = operationsRepository.create({
      day,
      openTime,
      closeTime,
      price,
      local,
    });

    await operationsRepository.save(operation);

    return local;
  }
}

export default CreateOperationsService;
