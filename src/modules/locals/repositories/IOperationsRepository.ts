/* eslint-disable semi */
import ICreateOperationsDTO from '../dtos/ICreateOperationsDTO';
import Operations from '../infra/typeorm/entities/Operations';

export default interface IOperationsRepository {
  create(data: ICreateOperationsDTO): Promise<Operations>;
}
