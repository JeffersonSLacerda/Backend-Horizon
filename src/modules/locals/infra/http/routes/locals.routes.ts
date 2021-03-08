/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';
import enshureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import CreateLocalService from '@modules/locals/services/CreateLocalService';
import UpdatePicturesLocalsService from '@modules/locals/services/UpdatePicturesLocalsService';

const localsRouter = Router();
const upload = multer(uploadConfig);

localsRouter.use(enshureAuthenticated);

localsRouter.post('/', async (request, response) => {
  try {
    const {
      city,
      state,
      name,
      cep,
      street,
      number,
      district,
      rootOrNutella,
      status,
      link,
      showName,
    } = request.body;

    const { profile, id } = request.user;

    const createLocalsService = new CreateLocalService();

    const local = await createLocalsService.execute({
      city,
      state,
      name,
      cep,
      street,
      number,
      district,
      rootOrNutella,
      status,
      link,
      showName,
      userId: id,
      profile,
    });

    return response.json(local);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

// para editar as imagens
localsRouter.patch(
  '/pictures/:localId',
  upload.array('picture', 6),
  async (request, response) => {
    try {
      const { localId } = request.params;
      const { id } = request.user;

      const { files } = request;
      const fileNames: string[] = files.map(({ filename }) =>
        fileNames.push(filename),
      );

      const updatePicturesLocals = new UpdatePicturesLocalsService();

      // receber o id do local
      // pegar os nomes dos arquivos do files e inserir num outro array
      return response.json({ ok: true });
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  },
);

export default localsRouter;
