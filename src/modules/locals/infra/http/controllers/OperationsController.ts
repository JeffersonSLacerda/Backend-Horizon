import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateOperationsService from '@modules/locals/services/CreateOperationsService';

export default class OperationsController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { localId } = request.params;

      // eslint-disable-next-line object-curly-newline
      const { day, closeTime, openTime, isAllDay, price } = request.body;

      const createOperations = container.resolve(CreateOperationsService);

      const local = await createOperations.execute({
        day,
        openTime,
        closeTime,
        isAllDay,
        price,
        localId,
      });

      return response.json(local);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}
