/* eslint-disable arrow-parens */
import { getRepository, Repository } from 'typeorm';

import IMessagesRepository from '@modules/users/repositories/IMessagesRepository';
import ICreateMessageDTO from '@modules/users/dtos/ICreateMessageDTO';
import UsersRepository from './UsersRepository';
import Message from '../entities/Message';

class MessagesRepostory implements IMessagesRepository {
  private ormRepository: Repository<Message>;

  constructor() {
    this.ormRepository = getRepository(Message);
  }

  public async findById(id: string): Promise<Message | undefined> {
    return this.ormRepository.findOne(id);
  }

  public async getAll(): Promise<Message[] | undefined> {
    const messages = await this.ormRepository.find();

    return messages;
  }

  public async create({
    subject,
    text,
    userId,
  }: ICreateMessageDTO): Promise<Message> {
    const usersRepository = new UsersRepository();

    const findUser = await usersRepository.findById(userId);

    if (!findUser) {
      throw new Error('User not Found');
    }

    const message = this.ormRepository.create({
      subject,
      text,
      user: findUser,
    });

    await this.ormRepository.save(message);

    return message;
  }

  public async save(message: Message): Promise<Message> {
    return this.ormRepository.save(message);
  }

  public async delete(id: string): Promise<void> {
    const message = await this.findById(id);

    if (!message) {
      throw new Error('Message not found');
    }

    await this.ormRepository.delete(message);
  }
}

export default MessagesRepostory;
