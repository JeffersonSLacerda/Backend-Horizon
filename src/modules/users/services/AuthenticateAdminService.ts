import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { injectable, inject } from 'tsyringe';

import authConfig from '@config/auth';

import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

interface Request {
  email: string;
  password: string;
}

interface Response {
  admin: User;
  token: string;
}

@injectable()
class AuthenticateAdminService {
  constructor(
    @inject('UserRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ email, password }: Request): Promise<Response> {
    const admin = await this.usersRepository.findByEmail(email);

    if (!admin) {
      throw new Error('Incorrect email/password combination');
    }

    if (!admin.isAtivo) {
      throw new Error('Access denied. User not allowed.');
    }

    if (admin.profile.type === 'client') {
      throw new Error('Access danied. Admin permission required');
    }

    const passwordMatched = await compare(password, admin.password);

    if (!passwordMatched) {
      throw new Error('Incorrect email/password combination');
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({ profile: admin.profile.type }, secret, {
      subject: admin.id,
      expiresIn,
    });

    return { admin, token };
  }
}

export default AuthenticateAdminService;
