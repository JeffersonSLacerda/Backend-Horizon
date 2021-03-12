import IPicturesRepository from '@modules/locals/repositories/IPicturesRepository';
import { getRepository, Repository } from 'typeorm';
import Pictures from '../entities/Pictures';
import LocalsRepository from './LocalsRepository';

class PicturesRepository implements IPicturesRepository {
  private ormRepository: Repository<Pictures>;

  constructor() {
    this.ormRepository = getRepository(Pictures);
  }

  public async findAllPicturesToCurrentLocal(
    localId: string,
  ): Promise<Pictures[] | undefined> {
    const localPictures = await this.ormRepository.find({
      where: { local: localId },
    });

    return localPictures || undefined;
  }

  public async create(name: string, localId: string): Promise<Pictures> {
    const localsRepoisitory = new LocalsRepository();

    const local = await localsRepoisitory.findById(localId);

    const picture = this.ormRepository.create({ name, local });

    return picture;
  }
}

export default PicturesRepository;
