import { Request, Response } from 'express';
import { container } from 'tsyringe';

import GetAllUsersOrderByCreateService from '@modules/users/services/GetAllUsersOrderByCreateService';
import GetUsersCreatedTodayService from '@modules/users/services/GetUsersCreatedTodayService';
import DeactivateUserService from '@modules/users/services/DeactivateUserService';
import GivAdministratorPermissionService from '@modules/users/services/GivAdministratorPermitionService';

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

  public async update(request: Request, response: Response): Promise<Response> {
    try {
      const { profile } = request.user;
      const { id } = request.params;

      if (profile !== 'admin') {
        throw new Error('Permission Danied');
      }

      const usersService = container.resolve(GivAdministratorPermissionService);

      const user = await usersService.execute(id);

      return response.json(user);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;

      const deactivateUserService = container.resolve(DeactivateUserService);

      await deactivateUserService.execute(id);

      return response.status(200).json({ message: 'User deleted' });
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}
