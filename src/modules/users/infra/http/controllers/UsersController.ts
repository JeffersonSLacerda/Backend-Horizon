import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUserService from '@modules/users/services/CreateUserService';
import UpdateUserService from '@modules/users/services/UpdateUserService';
import ShowUserService from '@modules/users/services/ShowUserService';

export default class UsersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { id, profile } = request.user;

    const { userId } = request.params;

    if (userId !== id || profile !== 'admin') {
      throw new Error('Permission danied');
    }

    const showUser = container.resolve(ShowUserService);

    const user = await showUser.execute({ userId });

    const userWithoutPassword = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      city: user.city,
      state: user.uf,
      profile: {
        id: user.profile.id,
        type: user.profile.type,
      },
      isAtivo: user.isAtivo,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };

    return response.json(userWithoutPassword);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const {
        firstName,
        lastName,
        email,
        password,
        city,
        uf,
        profile,
        isAtivo,
      } = request.body;

      const createUser = container.resolve(CreateUserService);

      const user = await createUser.execute({
        firstName,
        lastName,
        email,
        password,
        city,
        uf,
        profile,
        isAtivo,
      });

      const userWithoutPassword = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        city: user.city,
        state: user.uf,
        profile: {
          id: user.profile.id,
          type: user.profile.type,
        },
        isAtivo: user.isAtivo,
        created_at: user.created_at,
        updated_at: user.updated_at,
      };

      return response.json(userWithoutPassword);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }

  public async update(request: Request, response: Response): Promise<Response> {
    try {
      const {
        firstName,
        lastName,
        email,
        oldPassword,
        password,
        city,
        uf,
      } = request.body;

      const { id, profile } = request.user;

      const { userId } = request.params;

      if (userId !== id || profile !== 'admin') {
        throw new Error('Permission danied');
      }

      const updateUser = container.resolve(UpdateUserService);

      const user = await updateUser.execute({
        userId,
        firstName,
        lastName,
        email,
        oldPassword,
        password,
        city,
        uf,
      });

      const userWithoutPassword = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        city: user.city,
        state: user.uf,
        profile: {
          id: user.profile.id,
          type: user.profile.type,
        },
        isAtivo: user.isAtivo,
        created_at: user.created_at,
        updated_at: user.updated_at,
      };

      return response.json(userWithoutPassword);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}
