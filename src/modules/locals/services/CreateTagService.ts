/* eslint-disable arrow-parens */
import { getRepository } from 'typeorm';

import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import Locals from '../infra/typeorm/entities/Local';
import Tags from '../infra/typeorm/entities/Tags';
import LocalsRepository from '../infra/typeorm/repositories/LocalsRepository';

interface Request {
  tags: string[];
  localId: string;
  userId: string;
}

class CreateTagService {
  public async execute({ tags, localId, userId }: Request): Promise<Locals> {
    const tagRepository = getRepository(Tags);
    const localRepository = new LocalsRepository();
    const userRepository = new UsersRepository();

    const local = await localRepository.findById(localId);

    const validUser = await userRepository.findById(userId);

    if (!validUser) {
      throw new Error('Only autenhicated user can change Locals Pictures');
    }

    const checkTags = tags.map(async tag => {
      const hasTag = await tagRepository.findOne({
        where: {
          name: tag,
        },
      });

      if (hasTag) {
        tags.splice(1);
      }
    });

    checkTags.map(async tag => {
      const name = tag.toString();
      const newTag = tagRepository.create({
        name,
      });
      if (local?.tags) {
        local?.tags = tag;
      }

      await tagRepository.save(newTag);
    });

    // if (local?.tags) {
    //   local.tags = [tags];
    // }
    //
    return local as Locals;
  }
}

export default CreateTagService;
