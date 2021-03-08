interface Request {
  localId: string;
  userId: string;
  picturesFilenames: string[];
}

class UpdatePicturesLocalsService {
  public async execute({
    localId,
    picturesFilenames,
  }: Request): Promise<void> {}
}

export default UpdatePicturesLocalsService;
