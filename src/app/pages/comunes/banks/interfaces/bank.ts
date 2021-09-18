export interface Bank {
  id: number;
  code: string;
  shortName: string;
  largeName: string;
}
export interface BankAddOrEditDto {
  code: string;
  shortName: string;
  largeName: string;
}
