/* eslint-disable arrow-parens */
/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
import ITagsRespository from '@modules/locals/repositories/ITagsRepository';
import { getRepository, Repository } from 'typeorm';
import Tags from '../entities/Tags';

class TagsRepository implements ITagsRespository {
  private ormRepository: Repository<Tags>;

  constructor() {
    this.ormRepository = getRepository(Tags);
  }

  public async create(name: string): Promise<Tags> {
    const tag = this.ormRepository.create({ name });

    await this.ormRepository.save(tag);

    return tag;
  }

  public async findByName(name: string): Promise<Tags | undefined> {
    return this.ormRepository.findOne({
      where: {
        name,
      },
    });
  }
}

export default TagsRepository;
