import CreateTagService from '@modules/locals/services/CreateTagService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class RateController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { localId } = request.params;

    const { tags, rate, description } = request.body;

    const createRate = container.resolve(CreateTagService);

    const avaliate = createRate.execute({
      tags,
      rate,
      description,
      localId,
    });

    return response.json(avaliate);
  }
}
