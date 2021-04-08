/* eslint-disable semi */
import Message from '../infra/typeorm/entities/Message';

import ICreateMessageDTO from '../dtos/ICreateMessageDTO';

export default interface IMessagesRepository {
  getAll(): Promise<Message[] | undefined>;
  findById(id: string): Promise<Message | undefined>;
  create(data: ICreateMessageDTO): Promise<Message>;
  save(message: Message): Promise<Message>;
  delete(id: string): Promise<void>;
}
