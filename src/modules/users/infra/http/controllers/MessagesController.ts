import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateMessageService from '@modules/users/services/CreateMessageService';
import GetAllMessagesService from '@modules/users/services/GetAllMessagesService';
import DeleteMessageService from '@modules/users/services/DeleteMessageService';

export default class MessagesController {
  public async list(request: Request, response: Response): Promise<Response> {
    try {
      const { profile } = request.user;

      if (profile !== 'admin') {
        throw new Error('User without permission');
      }

      const getAllMessagesService = container.resolve(GetAllMessagesService);

      const messages = getAllMessagesService.execute();

      return response.json({ messages });
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }

  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { subject, text } = request.params;
      const userId = request.user.id;

      const createMessageService = container.resolve(CreateMessageService);

      const message = await createMessageService.execute({
        subject,
        text,
        userId,
      });

      return response.json(message);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    try {
      const { messageId } = request.params;

      const deleteMessageService = container.resolve(DeleteMessageService);

      await deleteMessageService.execute({ messageId });

      return response.status(201).json({ message: 'Message Deleted' });
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}
