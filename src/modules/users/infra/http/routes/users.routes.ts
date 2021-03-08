import { Router } from 'express';

import CreateUserService from '@modules/users/services/CreateUserService';

const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      city,
      state,
      profile,
      isAtivo,
    } = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({
      firstName,
      lastName,
      email,
      password,
      city,
      state,
      profile,
      isAtivo,
    });

    const userWithoutPassword = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      city: user.city,
      state: user.state,
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
});

export default usersRouter;
