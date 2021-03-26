import { inject, injectable } from 'tsyringe';

import IHashProivider from '@modules/users/providers/HashProvider/models/IHashProivider';
import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

interface Request {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  city: string;
  uf: string;
  profile: 'client' | 'admin';
  isAtivo: boolean;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProivider,
  ) {}

  public async execute({
    firstName,
    lastName,
    email,
    password,
    city,
    uf,
    profile,
    isAtivo,
  }: Request): Promise<User> {
    const checkUserExist = await this.usersRepository.findByEmail(email);

    const hashedPassword = await this.hashProvider.generateHash(password);

    if (checkUserExist) {
      throw new Error('Email adrress alredy user');
    }

    const user = await this.usersRepository.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      city,
      uf,
      profile,
      isAtivo,
    });

    return user;
  }
}

export default CreateUserService;
