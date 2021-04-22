import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { email, password } = request.body;

      const authenticateUser = container.resolve(AuthenticateUserService);

      const { user, token } = await authenticateUser.execute({
        email,
        password,
      });

      // const userWithoutPassword = {
      //   id: user.id,
      //   firstName: user.firstName,
      //   lastName: user.lastName,
      //   email: user.email,
      //   city: user.city,
      //   state: user.uf,
      //   isAtivo: user.isAtivo,
      //   created_at: user.created_at,
      //   updated_at: user.updated_at,
      //   profile: {
      //     id: user.profile.id,
      //     type: user.profile.type,
      //   },
      // };

      response.set('Access-Control-Allow-Origin', '*');
      return response.json({ user: classToClass(user), token });
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}
