import { getRepository } from 'typeorm';

import Locals from '../infra/typeorm/entities/Local';
import Tags from '../infra/typeorm/entities/Tags';

interface Request {
  tags: string[];
  description: string;
  rating: number;
}

class CreateEvaluationService {
  public async execute() {
    const tagsRepository = getRepository(Tags);

    const localTags = tags.map((tag: string) =>
      tagsRepository.create({
      name: tag,
    }));

    await tagsRepository.save(localTags);
  }
}

export default CreateEvaluationService;
