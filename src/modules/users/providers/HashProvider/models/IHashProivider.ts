/* eslint-disable semi */
export default interface IHashProvider {
  generateHash(paylaod: string): Promise<string>;
  compareHash(payload: string, hashed: string): Promise<boolean>;
}
