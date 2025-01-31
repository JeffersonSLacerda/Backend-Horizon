import IUserTokensRespository from '@modules/users/repositories/IUserTokensRepository';
import { getRepository, Repository } from 'typeorm';
import UserToken from '../entities/UserToken';

class UserTokensRepository implements IUserTokensRespository {
  private ormRepository: Repository<UserToken>;

  constructor() {
    this.ormRepository = getRepository(UserToken);
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = await this.ormRepository.findOne({ where: { token } });

    return userToken;
  }

  public async generate(userId: string): Promise<UserToken> {
    const userToken = this.ormRepository.create({ userId });

    await this.ormRepository.save(userToken);

    return userToken;
  }
}

export default UserTokensRepository;
