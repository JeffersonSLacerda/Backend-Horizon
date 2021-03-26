import { injectable, inject } from 'tsyringe';
import IUsersRepository from '../repositories/IUsersRepository';

@injectable()
class DeactivateUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUsersRepository,
  ) {}

  public async execute(id: string) {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new Error('User not exists');
    }

    await this.userRepository.deactivate(id);
  }
}

export default DeactivateUserService;
