import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';
import enshureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const localsRouter = Router();
const upload = multer(uploadConfig);

localsRouter.use(enshureAuthenticated);

localsRouter.post('/', (request, response) => {
  try {
    return response.json({ ok: true });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

localsRouter.patch(
  '/pictures',
  upload.array('picture', 6),
  async (request, response) => {
    console.log(request.file);

    return response.json({ ok: true });
  },
);

export default localsRouter;
