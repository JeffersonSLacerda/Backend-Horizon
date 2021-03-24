import { container } from 'tsyringe';

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

container.registerSingleton<ILocalsRepository>(
  'LocalsRepository',
  LocalsRepository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRespository',
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
