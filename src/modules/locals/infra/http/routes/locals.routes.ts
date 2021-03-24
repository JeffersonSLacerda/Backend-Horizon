/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';
import enshureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import LocalsController from '../controllers/LocalsController';
import OperationsController from '../controllers/OperationsController';
import LocalPicturesController from '../controllers/LocalPicturesController';
import RateController from '../controllers/RatesController';

const localsRouter = Router();
const upload = multer(uploadConfig);

const localsController = new LocalsController();
const localPicturesController = new LocalPicturesController();
const operationsController = new OperationsController();
const rateController = new RateController();

localsRouter.get('/', localsController.index);

localsRouter.post('/', enshureAuthenticated, localsController.create);

// para editar as imagens
localsRouter.patch(
  '/pictures/:localId',
  enshureAuthenticated,
  upload.single('picture'),
  localPicturesController.update,
);

localsRouter.patch(
  '/operations/:localId',
  enshureAuthenticated,
  operationsController.create,
);

localsRouter.patch(
  '/avaliate/:localId',
  enshureAuthenticated,
  rateController.create,
);

export default localsRouter;
