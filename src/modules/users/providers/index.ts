import { container } from 'tsyringe';

import IHashProivider from './HashProvider/models/IHashProivider';
import BCryptHashProvider from './HashProvider/implementations/BCryptHashProvider';

container.registerSingleton<IHashProivider>('HashProvider', BCryptHashProvider);
