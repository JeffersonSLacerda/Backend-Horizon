/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable arrow-parens */
import { Router } from 'express';

import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import CreateUserService from '@modules/users/services/CreateUserService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

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

    const usersRepository = new UsersRepository();
    const createUser = new CreateUserService(usersRepository);

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

usersRouter.get('/', ensureAuthenticated, async (request, response) => {
  try {
    const { profile } = request.user;

    if (profile !== 'admin') {
      throw new Error('Permission Danied');
    }

    const usersRepository = new UsersRepository();

    const users = await usersRepository.findAllAndOrderByCreate();

    const count = users?.length;

    return response.json({ users, count });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

usersRouter.get('/today', ensureAuthenticated, async (request, response) => {
  try {
    const { profile } = request.user;

    if (profile !== 'admin') {
      throw new Error('Permission Danied');
    }

    const usersRepository = new UsersRepository();

    const users = await usersRepository.findAllCreatedToday();

    const total = users?.length;

    return response.json({ users, total });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

// usersRouter.delete('/:id', async (request, response) => {
//   const id = request.params;
//   const { profile } = request.user;

//   if (profile !== 'admin') {
//     throw new Error('Permission Danied');
//   }

//   const usersRepository = getRepository(User);

//   const user = await usersRepository.findOne(id);

//   // user?.isAtivo = false;

//   return response.status(400).json(user);
// });

export default usersRouter;
