import User from '@modules/users/infra/typeorm/entities/User';

/* eslint-disable semi */
export default interface ICreateLocalDTO {
  city: string;
  state: string;
  name: string;
  cep: string;
  street: string;
  number: string;
  district: string;
  link?: string;
  rootOrNutella: boolean;
  status: string;
  showName: boolean;
  user: User;
}
