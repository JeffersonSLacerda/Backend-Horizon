import IProfileRespository from '@modules/users/repositories/IProfilesRepository';
import { getRepository, Repository } from 'typeorm';
import Profile from '../entities/Profile';

class ProfilesRepository implements IProfileRespository {
  private ormRepository: Repository<Profile>;

  constructor() {
    this.ormRepository = getRepository(Profile);
  }

  public async findByTypeOrCreate(type: string): Promise<Profile> {
    let profile = await this.ormRepository.findOne({ where: { type } });

    if (!profile) {
      profile = this.ormRepository.create({ type });
      await this.ormRepository.save(profile);
    }

    return profile;
  }
}

export default ProfilesRepository;
