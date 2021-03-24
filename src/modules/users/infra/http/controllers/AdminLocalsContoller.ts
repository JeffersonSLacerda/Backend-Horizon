import { Request, Response } from 'express';
import { container } from 'tsyringe';

import GetAllLocalsOrderByCreateService from '@modules/locals/services/GetAllLocalsOrderByCreateService';
import GetAllLocalsCreatedTodayService from '@modules/locals/services/GetAllLocalsCreatedTodayService';

export default class AdminLocalsController {
  public async index(request: Request, response: Response): Promise<Response> {
    try {
      const { profile } = request.user;

      if (profile !== 'admin') {
        throw new Error('Permission Danied');
      }

      const localService = container.resolve(GetAllLocalsOrderByCreateService);

      const locals = await localService.execute();

      const count = locals?.length;

      return response.json({ locals, count });
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }

  public async list(request: Request, response: Response): Promise<Response> {
    try {
      const { profile } = request.user;

      if (profile !== 'admin') {
        throw new Error('Permission Danied');
      }

      const localService = container.resolve(GetAllLocalsCreatedTodayService);

      const locals = await localService.execute();

      const count = locals?.length;

      return response.json({ locals, count });
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}
