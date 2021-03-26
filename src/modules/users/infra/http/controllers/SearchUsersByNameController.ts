import { Request, Response } from 'express';
import { container } from 'tsyringe';

import SeachUsersByNameService from '@modules/users/services/SearchUsersByName';

export default class SearchByNameController {
  public async list(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;

    const search = container.resolve(SeachUsersByNameService);

    const users = search.execute(name);

    return response.json(users);
  }
}
