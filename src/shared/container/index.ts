import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';

import ILocalsRepository from '@modules/locals/repositories/ILocalsRepository';
import LocalsRepository from '@modules/locals/infra/typeorm/repositories/LocalsRepository';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IProfileRepository from '@modules/users/repositories/IProfilesRepository';
import ProfileRepository from '@modules/users/infra/typeorm/repositories/ProfilesRepository';

import IOperationsRepository from '@modules/locals/repositories/IOperationsRepository';
import OperationsRepository from '@modules/locals/infra/typeorm/repositories/OperationsRepository';

import ITagsRepository from '@modules/locals/repositories/ITagsRepository';
import TagsRepository from '@modules/locals/infra/typeorm/repositories/TagsRepository';

import IPicturesRepository from '@modules/locals/repositories/IPicturesRepository';
import PicturesRepository from '@modules/locals/infra/typeorm/repositories/PicturesRepository';

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';

import IMessagesRepository from '@modules/users/repositories/IMessagesRepository';
import MessagesRepository from '@modules/users/infra/typeorm/repositories/MessagesRepository';

container.registerSingleton<ILocalsRepository>(
  'LocalsRepository',
  LocalsRepository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IProfileRepository>(
  'ProfileRepository',
  ProfileRepository,
);

container.registerSingleton<IOperationsRepository>(
  'OperationsRepository',
  OperationsRepository,
);

container.registerSingleton<ITagsRepository>('TagsRepository', TagsRepository);

container.registerSingleton<IPicturesRepository>(
  'PicturesRepository',
  PicturesRepository,
);

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository,
);

container.registerSingleton<IMessagesRepository>(
  'MessagesRepository',
  MessagesRepository,
);
