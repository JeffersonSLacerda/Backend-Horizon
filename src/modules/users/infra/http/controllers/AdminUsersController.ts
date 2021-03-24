import { Request, Response } from 'express';
import { container } from 'tsyringe';

import GetAllUsersOrderByCreateService from '@modules/users/services/GetAllUsersOrderByCreateService';
import GetUsersCreatedTodayService from '@modules/users/services/GetUsersCreatedTodayService';

export default class AdminUsersController {
  public async index(request: Request, response: Response): Promise<Response> {
    try {
      const { profile } = request.user;

      if (profile !== 'admin') {
        throw new Error('Permission Danied');
      }

      const usersService = container.resolve(GetAllUsersOrderByCreateService);

      const users = await usersService.execute();
      const count = users?.length;

      return response.json({ users, count });
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

      const usersService = container.resolve(GetUsersCreatedTodayService);

      const users = await usersService.execute();

      const count = users?.length;

      return response.json({ users, count });
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}
