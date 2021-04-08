/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable arrow-parens */
import { Router } from 'express';

import UsersController from '../controllers/UsersController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();
const usersController = new UsersController();

usersRouter.post('/', usersController.create);
usersRouter.get('/:userId', ensureAuthenticated, usersController.index);
usersRouter.put('/:userId', ensureAuthenticated, usersController.update);

export default usersRouter;
