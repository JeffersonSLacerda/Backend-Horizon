/* eslint-disable semi */
import { DeleteResult } from 'typeorm';

import Locals from '../infra/typeorm/entities/Local';
import ICreateLocalDTO from '../dtos/ICreateLocalDTO';

export default interface ILocalsRepository {
  findById(id: string): Promise<Locals | undefined>;
  findByCity(city: string): Promise<Locals[] | undefined>;
  findByName(name: string): Promise<Locals[] | undefined>;
  findAllAndOrderByCreate(): Promise<Locals[] | undefined>;
  findAllCreatedToday(): Promise<Locals[] | undefined>;
  findMostPopularLocals(): Promise<Locals[] | undefined>;
  getRootOrNutellaLocals(root: boolean): Promise<Locals[] | undefined>;
  checkState(name: string): Promise<string | undefined>;
  create(data: ICreateLocalDTO): Promise<Locals>;
  save(local: Locals): Promise<Locals>;
  delete(local: Locals): Promise<DeleteResult>;
}
