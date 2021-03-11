/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable arrow-parens */
import { Router } from 'express';
import { getRepository } from 'typeorm';
import { isSameDay } from 'date-fns';

import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import CreateUserService from '@modules/users/services/CreateUserService';

import User from '../../typeorm/entities/User';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();

const usersRepository = new UsersRepository();

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

// usersRouter.get('/', ensureAuthenticated, async (request, response) => {
//   try {
//     const { profile } = request.user;

//     if (profile !== 'admin') {
//       throw new Error('Permission Danied');
//     }

//     const usersRepository = getRepository(User);

//     const users = await usersRepository.find();

//     const count = users.length;

//     return response.json({ users, count });
//   } catch (err) {
//     return response.status(400).json({ error: err.message });
//   }
// });

// usersRouter.get('/today', ensureAuthenticated, async (request, response) => {
//   try {
//     const { profile } = request.user;

//     if (profile !== 'admin') {
//       throw new Error('Permission Danied');
//     }

//     const usersRepository = getRepository(User);

//     const users = await usersRepository.find();

//     const today: User[] = [];

//     users.forEach(user => {
//       if (isSameDay(new Date(), user.created_at)) {
//         today.push(user);
//       }
//     });

//     return response.json(today.length);
//   } catch (err) {
//     return response.status(400).json({ error: err.message });
//   }
// });

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
