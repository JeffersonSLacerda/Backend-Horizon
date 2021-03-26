import { injectable, inject } from 'tsyringe';
import IUsersRepository from '../repositories/IUsersRepository';

@injectable()
class GivAdministratorPermissionService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUsersRepository,
  ) {}

  public async execute(id: string) {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new Error('User not exists');
    }

    user.profile.type = 'admin';

    await this.userRepository.save(user);
  }
}

export default GivAdministratorPermissionService;
