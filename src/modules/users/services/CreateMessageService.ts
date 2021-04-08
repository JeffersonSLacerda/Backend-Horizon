import { inject, injectable } from 'tsyringe';

import Message from '../infra/typeorm/entities/Message';

import IMessagesRepository from '../repositories/IMessagesRepository';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  subject: string;
  text: string;
  userId: string;
}

@injectable()
class CreateMessageService {
  constructor(
    @inject('MessagesRepository')
    private messagesRepository: IMessagesRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ subject, text, userId }: IRequest): Promise<Message> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new Error('User not found');
    }

    const message = await this.messagesRepository.create({
      subject,
      text,
      userId: user.id,
    });

    return message;
  }
}

export default CreateMessageService;
