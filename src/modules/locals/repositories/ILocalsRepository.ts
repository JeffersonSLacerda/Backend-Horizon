/* eslint-disable semi */
import Locals from '../infra/typeorm/entities/Local';
import ICreateLocalDTO from '../dtos/ICreateLocalDTO';

export default interface ILocalsRepository {
  create(data: ICreateLocalDTO): Promise<Locals>;
}
