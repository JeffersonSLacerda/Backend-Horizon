import { inject, injectable } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ILocalsRepository from '../repositories/ILocalsRepository';
import Locals from '../infra/typeorm/entities/Local';

interface Request {
  city: string;
  state: string;
  name: string;
  cep: string;
  street: string;
  number: string;
  district: string;
  link?: string;
  rootOrNutella: boolean;
  status: 'ok' | 'waiting' | 'refused';
  userId: string;
  localId: string;
  showName: boolean;
}
@injectable()
class UpdateLocalsService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('LocalsRepository')
    private localsRepository: ILocalsRepository,
  ) {}

  public async execute({
    city,
    state,
    name,
    cep,
    street,
    number,
    district,
    link,
    status,
    rootOrNutella,
    localId,
    userId,
    showName,
  }: Request): Promise<Locals> {
    const validUser = await this.usersRepository.findById(userId);

    if (!validUser) {
      throw new Error('Only autenhicated user can change Locals Pictures');
    }

    const local = await this.localsRepository.findById(localId);

    if (!local) {
      throw new Error('Invalid local');
    }

    if (local?.user.id === userId || validUser.profile.type === 'admin') {
      throw new Error(
        'User need be owner this local or admin to update locals',
      );
    }

    local.city = city;
    local.state = state;
    local.name = name;
    local.cep = cep;
    local.street = street;
    local.number = number;
    local.district = district;
    local.link = link;
    local.status = status;
    local.rootOrNutella = rootOrNutella;
    local.showName = showName;

    return this.localsRepository.save(local);
  }
}

export default UpdateLocalsService;
