import { Router } from 'express';

import AuthenticateAdminService from '@modules/users/services/AuthenticateAdminService';

const adminRouter = Router();

adminRouter.post('/', async (request, response) => {
  try {
    const { email, password } = request.body;

    const authenticateAdmin = new AuthenticateAdminService();

    const { admin, token } = await authenticateAdmin.execute({
      email,
      password,
    });

    const adminWithoutPassword = {
      id: admin.id,
      firstName: admin.firstName,
      lastName: admin.lastName,
      email: admin.email,
      city: admin.city,
      state: admin.state,
      isAtivo: admin.isAtivo,
      created_at: admin.created_at,
      updated_at: admin.updated_at,
      profile: {
        id: admin.profile.id,
        type: admin.profile.type,
      },
    };

    return response.json({ adminWithoutPassword, token });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default adminRouter;
