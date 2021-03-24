import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import authConfig from '@config/auth';

import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

@injectable()
class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ email, password }: Request): Promise<Response> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new Error('Incorrect email/password combination');
    }

    if (!user.isAtivo) {
      throw new Error('Access denied. User not allowed.');
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new Error('Incorrect email/password combination');
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({ profile: user.profile.type }, secret, {
      subject: user.id,
      expiresIn,
    });

    return { user, token };
  }
}

export default AuthenticateUserService;
