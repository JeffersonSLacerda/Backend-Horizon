/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
import ITagsRespository from '@modules/locals/repositories/ITagsRepository';
import { getRepository, Repository } from 'typeorm';
import Locals from '../entities/Local';
import Tags from '../entities/Tags';
import LocalsRepository from './LocalsRepository';

class TagsRepository implements ITagsRespository {
  private ormRepository: Repository<Tags>;

  private localsRepository: Repository<Locals>;

  constructor() {
    this.ormRepository = getRepository(Tags);
    this.localsRepository = getRepository(Locals);
  }

  public async create(tags: string[], localId: string): Promise<Tags[]> {
    // const local = await localsRepository.findById(localId);

    // eslint-disable-next-line arrow-parens
    tags.map(async tag => {
      const hasTag = await this.ormRepository.findOne({ where: { name: tag } });
      if (!hasTag) {
        const newTag = this.ormRepository.create({ name: tag });
        await this.ormRepository.save(newTag);
      }

      const local = await this.localsRepository.findOne(localId);
      local?.tags = tag;
    });
  }
}

export default TagsRepository;
