/* eslint-disable arrow-parens */
/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
import ITagsRespository from '@modules/locals/repositories/ITagsRepository';
import { getRepository, Repository } from 'typeorm';
import Tags from '../entities/Tags';
import LocalsRepository from './LocalsRepository';

class TagsRepository implements ITagsRespository {
  private ormRepository: Repository<Tags>;

  constructor() {
    this.ormRepository = getRepository(Tags);
  }

  public async create(tags: string[], localId: string): Promise<Tags[]> {
    const localsRepository = new LocalsRepository();
    const newTags: Tags[] = [];
    tags.map(async tag => {
      let hasTag = await this.ormRepository.findOne({ where: { name: tag } });
      if (!hasTag) {
        hasTag = this.ormRepository.create({ name: tag });
        await this.ormRepository.save(hasTag);
      }
      newTags.push(hasTag);
    });

    const local = await localsRepository.findById(localId);
    newTags.map(tag => {
      if (local) {
        local.tags = [tag];
      }
      return newTags;
    });

    return newTags;
  }
}

export default TagsRepository;
