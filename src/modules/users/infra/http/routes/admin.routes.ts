import { Router } from 'express';

import SearchLocalsByNameController from '@modules/locals/infra/http/controllers/SearchLocalsByNameController';
import SearchUsersByNameController from '../controllers/SearchUsersByNameController';
import AdminUsersController from '../controllers/AdminUsersController';
import AdminLocalsController from '../controllers/AdminLocalsContoller';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const adminRouter = Router();

const adminUsersController = new AdminUsersController();
const adminLocalsController = new AdminLocalsController();
const searchUsersByNameController = new SearchUsersByNameController();
const searchLocalsByNameController = new SearchLocalsByNameController();

adminRouter.use(ensureAuthenticated);

// adminRouter.post('/', async (request, response) => {
//   try {
//     const { email, password } = request.body;

//     const authenticateAdmin = new AuthenticateAdminService();

//     const { admin, token } = await authenticateAdmin.execute({
//       email,
//       password,
//     });

//     const adminWithoutPassword = {
//       id: admin.id,
//       firstName: admin.firstName,
//       lastName: admin.lastName,
//       email: admin.email,
//       city: admin.city,
//       state: admin.uf,
//       isAtivo: admin.isAtivo,
//       created_at: admin.created_at,
//       updated_at: admin.updated_at,
//       profile: {
//         id: admin.profile.id,
//         type: admin.profile.type,
//       },
//     };

//     return response.json({ adminWithoutPassword, token });
//   } catch (err) {
//     return response.status(400).json({ error: err.message });
//   }
// });

adminRouter.get('/users', adminUsersController.index);

adminRouter.get('/users/today', adminUsersController.list);

adminRouter.get('/users/search', searchUsersByNameController.list);

adminRouter.delete('/users/:id', adminUsersController.update);

adminRouter.delete('/users/:id', adminUsersController.delete);

adminRouter.get('/locals', adminLocalsController.index);

adminRouter.get('/locals/today', adminLocalsController.list);

adminRouter.get('/locals/search', searchLocalsByNameController.list);

export default adminRouter;
