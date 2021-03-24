import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateLocalService from '@modules/locals/services/CreateLocalService';
import GetAllLocalsOrderByCreateService from '@modules/locals/services/GetAllLocalsOrderByCreateService';

export default class LocalsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const localService = container.resolve(GetAllLocalsOrderByCreateService);

    const locals = localService.execute();

    return response.json(locals);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const {
        city,
        state,
        name,
        cep,
        street,
        number,
        district,
        rootOrNutella,
        status,
        link,
        showName,
      } = request.body;

      const { id } = request.user;

      const createLocalsService = container.resolve(CreateLocalService);

      const local = await createLocalsService.execute({
        city,
        state,
        name,
        cep,
        street,
        number,
        district,
        rootOrNutella,
        status,
        link,
        showName,
        userId: id,
      });

      return response.json(local);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}
