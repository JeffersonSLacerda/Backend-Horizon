import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdatePicturesLocalsService from '@modules/locals/services/UpdatePicturesLocalsService';

export default class LocalPicturesController {
  public async update(request: Request, response: Response): Promise<Response> {
    try {
      const { localId } = request.params;
      const userId = request.user.id;

      const updatePicturesLocals = container.resolve(
        UpdatePicturesLocalsService,
      );

      const local = await updatePicturesLocals.execute({
        localId,
        userId,
        pictureFilename: request.file.filename,
      });

      return response.json(local);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}
