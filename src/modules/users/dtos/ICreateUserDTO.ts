export default interface ICreateUserDTO {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  city: string;
  state: string;
  profile: 'client' | 'admin';
  isAtivo: boolean;
}
