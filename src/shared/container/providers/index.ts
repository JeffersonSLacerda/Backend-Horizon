import { container } from 'tsyringe';

import IStorageProvider from './SttorageProvider/models/IStorageProvider';
import DiskStorageProvider from './SttorageProvider/implementations/DiskStorageProvider';

import IMailProvider from './MailPorvider/models/IMailProvider';
import EtherealMailProvider from './MailPorvider/implementations/EtherealMailProvider';

import IMailTemplateProvider from './MailTemplateProvider/models/IMailTemplateProvider';
import HandlebarsMailTemplateProvider from './MailTemplateProvider/implementations/HandlebarsMailTemplateProvider';

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider,
);

container.registerSingleton<IMailTemplateProvider>(
  'MailTemplateProvider',
  HandlebarsMailTemplateProvider,
);

container.registerInstance<IMailProvider>(
  'MailProvider',
  container.resolve(EtherealMailProvider),
);
