import { hash } from 'bcryptjs';

import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

interface Request {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  city: string;
  state: string;
  profile: 'client' | 'admin';
  isAtivo: boolean;
}

class CreateUserService {
  constructor(private usersRepository: IUsersRepository) {}

  public async execute({
    firstName,
    lastName,
    email,
    password,
    city,
    state,
    profile,
    isAtivo,
  }: Request): Promise<User> {
    const checkUserExist = await this.usersRepository.findByEmail(email);

    const hashedPassword = await hash(password, 8);

    if (checkUserExist) {
      throw new Error('Email adrress alredy user');
    }

    const user = await this.usersRepository.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      city,
      state,
      profile,
      isAtivo,
    });

    return user;
  }
}

export default CreateUserService;
