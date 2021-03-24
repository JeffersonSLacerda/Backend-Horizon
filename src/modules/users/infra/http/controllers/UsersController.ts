import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUserService from '@modules/users/services/CreateUserService';

export default class UsersController {
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
}
