/* eslint-disable no-extra-semi */
/* eslint-disable prettier/prettier */
/* eslint-disable semi */
import Pictures from '../infra/typeorm/entities/Pictures';

export default interface IPicturesRepository {
  findAllPicturesToCurrentLocal(
    localId: string,
  ): Promise<Pictures[] | undefined>;
  create(name: string, localId: string): Promise<Pictures>
}
