import { Router } from 'express';

import ForgotPasswordController from '../controllers/ForgotPasswordController';
import ResetPasswordController from '../controllers/ResetPasswordController';

const passawordRouter = Router();
const forgotPasswordController = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController();

passawordRouter.post('/forgot', forgotPasswordController.create);
passawordRouter.post('/reset', resetPasswordController.create);

export default passawordRouter;
