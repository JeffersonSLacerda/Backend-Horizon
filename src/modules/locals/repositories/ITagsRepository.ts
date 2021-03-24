/* eslint-disable prettier/prettier */
/* eslint-disable no-extra-semi */
/* eslint-disable semi */
import Tags from '../infra/typeorm/entities/Tags';

export default interface ITagsRespository {
  create(name: string): Promise<Tags>;
  findByName(name: string): Promise<Tags | undefined>
};
