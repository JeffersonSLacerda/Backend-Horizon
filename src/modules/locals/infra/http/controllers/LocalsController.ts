import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateLocalService from '@modules/locals/services/CreateLocalService';
import GetAllLocalsOrderByCreateService from '@modules/locals/services/GetAllLocalsOrderByCreateService';
import UpdateLocalsService from '@modules/locals/services/UpdateLocalsService';

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

  public async update(request: Request, response: Response): Promise<Response> {
    try {
      const {
        city,
        state,
        name,
        cep,
        street,
        number,
        district,
        link,
        status,
        rootOrNutella,
        showName,
      } = request.body;

      const { id } = request.user;

      const { localId } = request.params;

      const updateLocalsService = container.resolve(UpdateLocalsService);

      const updateLocal = await updateLocalsService.execute({
        city,
        state,
        name,
        cep,
        street,
        number,
        district,
        link,
        status,
        rootOrNutella,
        userId: id,
        localId,
        showName,
      });

      return response.json(updateLocal);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}
