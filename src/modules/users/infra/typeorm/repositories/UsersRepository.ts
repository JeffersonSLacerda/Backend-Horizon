/* eslint-disable arrow-parens */
import { getRepository, Repository } from 'typeorm';
import isSameDay from 'date-fns/isSameDay';

import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ProfilesRepository from './ProfilesRepository';

import User from '../entities/User';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
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

  public async findByName(name: string): Promise<User[] | undefined> {
    const findUser = await this.ormRepository.find({
      where: { name },
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
    uf,
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
      uf,
      profile: createdProfile,
      isAtivo,
    });

    await this.ormRepository.save(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }

  public async deactivate(id: string): Promise<void> {
    const user = await this.ormRepository.findOne(id);

    if (user) {
      user.isAtivo = false;
    }

    await this.ormRepository.save(user as User);
  }
}

export default UsersRepository;
