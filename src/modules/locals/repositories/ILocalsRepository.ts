/* eslint-disable semi */
import Locals from '../infra/typeorm/entities/Local';
import ICreateLocalDTO from '../dtos/ICreateLocalDTO';

export default interface ILocalsRepository {
  findById(id: string): Promise<Locals | undefined>;
  checkState(name: string): Promise<string | undefined>;
  create(data: ICreateLocalDTO): Promise<Locals>;
}
