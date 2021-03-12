/* eslint-disable semi */
export default interface ICreateOperationsDTO {
  day: 'sun' | 'mon' | 'tue' | 'wen' | 'thu' | 'fri' | 'sat';
  openTime?: number;
  closeTime?: number;
  price?: number;
  localId: string;
}
