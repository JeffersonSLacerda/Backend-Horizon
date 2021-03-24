/* eslint-disable arrow-parens */
import ITagsRepository from '../repositories/ITagsRepository';
import ILocalsRepository from '../repositories/ILocalsRepository';
import Locals from '../infra/typeorm/entities/Local';

interface Request {
  tags: string[];
  rate: number;
  description: string;
  localId: string;
}

class CreateTagService {
  constructor(
    private tagsRepository: ITagsRepository,
    private localsRepository: ILocalsRepository,
  ) {}

  public async execute({
    tags,
    rate,
    description,
    localId,
  }: Request): Promise<void> {
    tags.map(async tag => {
      let hasTag = await this.tagsRepository.findByName(tag);
      if (!hasTag) {
        hasTag = await this.tagsRepository.create(tag);
      }
      const local = await this.localsRepository.findById(localId);

      if (local) {
        local.tags = [hasTag];
        local.rating = rate;
        local.description = description;
      }

      await this.localsRepository.save(local as Locals);
    });
  }
}

export default CreateTagService;
