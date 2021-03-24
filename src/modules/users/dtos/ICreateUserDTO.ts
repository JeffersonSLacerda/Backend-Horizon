/* eslint-disable semi */
export default interface ICreateUserDTO {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  city: string;
  uf: string;
  profile: 'client' | 'admin';
  isAtivo: boolean;
}
