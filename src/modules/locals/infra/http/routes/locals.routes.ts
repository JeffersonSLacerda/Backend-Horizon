/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
import { Router } from 'express';
import multer from 'multer';
import { getRepository } from 'typeorm';

import uploadConfig from '@config/upload';
import enshureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import CreateLocalService from '@modules/locals/services/CreateLocalService';
import UpdatePicturesLocalsService from '@modules/locals/services/UpdatePicturesLocalsService';
import CreateOperationsService from '@modules/locals/services/CreateOperationsService';
import Locals from '../../typeorm/entities/Local';

const localsRouter = Router();
const upload = multer(uploadConfig);

localsRouter.get('/', async (request, response) => {
  const localsRepository = getRepository(Locals);

  const locals = await localsRepository.find();

  return response.json(locals);
});

localsRouter.post('/', enshureAuthenticated, async (request, response) => {
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
  enshureAuthenticated,
  upload.single('picture'),
  async (request, response) => {
    try {
      const { localId } = request.params;
      const userId = request.user.id;

      const updatePicturesLocals = new UpdatePicturesLocalsService();

      const local = await updatePicturesLocals.execute({
        localId,
        userId,
        pictureFilename: request.file.filename,
      });

      return response.json(local);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  },
);

localsRouter.patch(
  '/operations/:localId',
  enshureAuthenticated,
  async (request, response) => {
    try {
      const { localId } = request.params;
      const userId = request.user.id;

      // eslint-disable-next-line object-curly-newline
      const { day, closeTime, openTime, isAllDay, price } = request.body;

      const createOperations = new CreateOperationsService();

      const local = await createOperations.execute({
        day,
        openTime,
        closeTime,
        isAllDay,
        price,
        localId,
        userId,
      });

      return response.json(local);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  },
);

export default localsRouter;
