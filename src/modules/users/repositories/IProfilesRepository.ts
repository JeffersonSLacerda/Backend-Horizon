/* eslint-disable semi */
import Profile from '../infra/typeorm/entities/Profile';

export default interface IProfileRespository {
  findByTypeOrCreate(type: string): Promise<Profile | undefined>;
}
