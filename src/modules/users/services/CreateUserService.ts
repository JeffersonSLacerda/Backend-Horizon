import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import User from '../infra/typeorm/entities/User';
import Profile from '../infra/typeorm/entities/Profile';

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
    const userRepository = getRepository(User);
    const profileRepository = getRepository(Profile);

    const checkUserExist = await userRepository.findOne({
      where: { email },
    });

    const hashedPassword = await hash(password, 8);

    if (checkUserExist) {
      throw new Error('Email adrress alredy user');
    }

    let userProfile = await profileRepository.findOne({
      where: {
        type: profile,
      },
    });

    if (!userProfile) {
      userProfile = profileRepository.create({
        type: profile,
      });

      await profileRepository.save(userProfile);
    }

    const user = userRepository.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      city,
      state,
      profile: userProfile,
      isAtivo,
    });

    await userRepository.save(user);

    return user;
  }
}

export default CreateUserService;
