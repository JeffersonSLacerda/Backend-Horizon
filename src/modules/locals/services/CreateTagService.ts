/* eslint-disable arrow-parens */
import { getRepository } from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';
import Locals from '../infra/typeorm/entities/Local';
import Tags from '../infra/typeorm/entities/Tags';

interface Request {
  tags: string[];
  localId: string;
  userId: string;
}

class CreateTagService {
  public async execute({ tags, localId, userId }: Request): Promise<Locals> {
    const tagRepository = getRepository(Tags);
    const localRepository = getRepository(Locals);
    const userRepository = getRepository(User);

    const local = await localRepository.findOne({ where: { id: localId } });

    const validUser = await userRepository.findOne(userId);

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

      await tagRepository.save(newTag);
    });

    if (local?.tags) {
      local.tags = [tags];
    }
    //
    return local as Locals;
  }
}

export default CreateTagService;
