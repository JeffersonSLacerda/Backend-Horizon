import { inject, injectable } from 'tsyringe';

import IMessagesRepository from '../repositories/IMessagesRepository';

interface IRequest {
  messageId: string;
}

@injectable()
class DeleteMessageService {
  constructor(
    @inject('MessagesRepository')
    private messagesRepository: IMessagesRepository,
  ) {}

  public async execute({ messageId }: IRequest): Promise<void> {
    await this.messagesRepository.delete(messageId);
  }
}

export default DeleteMessageService;
