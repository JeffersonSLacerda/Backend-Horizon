import { container } from 'tsyringe';
import { Request, Response } from 'express';
import SearchLocalsByNameService from '@modules/locals/services/SearchLocalsByNameService';

export default class SearchLocalsByNameController {
  public async list(request: Request, response: Response) {
    const { name } = request.body;

    const search = container.resolve(SearchLocalsByNameService);

    const locals = search.execute(name);

    return response.json(locals);
  }
}
