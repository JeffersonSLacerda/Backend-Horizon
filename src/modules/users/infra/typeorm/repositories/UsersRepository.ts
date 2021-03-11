/* eslint-disable arrow-parens */
import { getRepository, Repository } from 'typeorm';
import isSameDay from 'date-fns/isSameDay';

import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ProfilesRepository from './ProfilesRepository';

import User from '../entities/User';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  cosntructor() {
    this.ormRepository = getRepository(User);
  }

  public async findById(id: string): Promise<User | undefined> {
    const findUser = await this.ormRepository.findOne(id);

    return findUser;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const findUser = await this.ormRepository.findOne({
      where: { email },
    });

    return findUser;
  }

  public async findAllAndOrderByCreate(): Promise<User[] | undefined> {
    const findUsers = await this.ormRepository.find({
      order: { created_at: 'DESC' },
    });

    return findUsers;
  }

  public async findAllCreatedToday(): Promise<User[] | undefined> {
    const findUsers = await this.findAllAndOrderByCreate();

    const createdToday: User[] = [];

    findUsers?.forEach(user => {
      if (isSameDay(new Date(), user.created_at)) {
        createdToday.push(user);
      }
    });

    return createdToday;
  }

  public async create({
    firstName,
    lastName,
    city,
    state,
    email,
    password,
    isAtivo,
    profile,
  }: ICreateUserDTO): Promise<User> {
    const profileRepository = new ProfilesRepository();

    const createdProfile = await profileRepository.findByTypeOrCreate(profile);

    const user = this.ormRepository.create({
      firstName,
      lastName,
      email,
      password,
      city,
      state,
      profile: createdProfile,
      isAtivo,
    });

    await this.ormRepository.save(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }
}

export default UsersRepository;
