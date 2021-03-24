/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable arrow-parens */
import { Router } from 'express';

import UsersController from '../controllers/UsersController';
// import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();
const usersController = new UsersController();

usersRouter.post('/', usersController.create);

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
