import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/users.routes';
import adminRouter from '@modules/users/infra/http/routes/admin.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import localsRouter from '@modules/locals/infra/http/routes/locals.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/admin', adminRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/locals', localsRouter);
routes.use('/password', passwordRouter);

export default routes;
