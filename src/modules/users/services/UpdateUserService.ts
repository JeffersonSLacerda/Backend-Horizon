import { inject, injectable } from 'tsyringe';

import IHashProivider from '@modules/users/providers/HashProvider/models/IHashProivider';
import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

interface Request {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  oldPassword?: string;
  password?: string;
  city: string;
  uf: string;
}

@injectable()
class UpdateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProivider,
  ) {}

  public async execute({
    userId,
    firstName,
    lastName,
    email,
    oldPassword,
    password,
    city,
    uf,
  }: Request): Promise<User> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new Error('User not exists');
    }

    const userWithUpdatedEmail = await this.usersRepository.findByEmail(email);

    if (userWithUpdatedEmail && user.id !== userId) {
      throw new Error('Email alredy exist');
    }

    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.city = city;
    user.uf = uf;

    if (password && oldPassword) {
      user.password = await this.hashProvider.generateHash(password);

      const checkOldPassword = await this.hashProvider.compareHash(
        oldPassword,
        user.password,
      );

      if (!checkOldPassword) {
        throw new Error('Inform a correct olp password');
      }
    }

    return this.usersRepository.save(user);
  }
}

export default UpdateUserService;
