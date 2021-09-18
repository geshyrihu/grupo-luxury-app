export interface customerDto {
  id: number;
  active: boolean;
  adreess: string;
  nameCustomer: string;
  phoneOne: string;
  phoneTwo: string;
  photoPath: string;
  register: string;
  rfc: string;
}
export interface customerAddOrEditDto {
  active: boolean;
  adreess: string;
  nameCustomer: string;
  phoneOne: string;
  phoneTwo: string;
  photoPath: File;
  register: string;
  rfc: string;
}
