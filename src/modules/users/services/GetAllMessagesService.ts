import { inject, injectable } from 'tsyringe';

import Message from '../infra/typeorm/entities/Message';

import IMessagesRepository from '../repositories/IMessagesRepository';

@injectable()
class GetAllMessagesService {
  constructor(
    @inject('MessagesRepository')
    private messagesRepository: IMessagesRepository,
  ) {}

  public async execute(): Promise<Message[] | undefined> {
    const messages = this.messagesRepository.getAll();

    return messages;
  }
}

export default GetAllMessagesService;
