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
    });

    user.password = 'password';

    return response.json(user);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default usersRouter;
