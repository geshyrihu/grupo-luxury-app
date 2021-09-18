import { EArea } from 'src/app/shared/enums/EArea';
import { EBloodType } from 'src/app/shared/enums/EBloodType';
import { EEducationLevel } from 'src/app/shared/enums/EEducationLevel';
import { EMaritalStatus } from 'src/app/shared/enums/EMaritalStatus';
import { ESex } from 'src/app/shared/enums/ESex';
import { ETypeContract } from 'src/app/shared/enums/ETypeContract';

export interface EmployeeAddOrEditDto {
  dateCreation: string | null;
  active: boolean;
  name: string;
  lastName: string;
  birth: string;
  salary: number;
  typeContract: ETypeContract | null;
  photoPath: File;
  curp: string;
  rFC: string;
  nSS: string;
  sex: ESex | null;
  dateAdmission: string;
  address: string;
  cellPhone: string;
  localPhone: string;
  bloodType: EBloodType | null;
  nationality: string;
  maritalStatus: EMaritalStatus | null;
  educationLevel: EEducationLevel | null;
  area: EArea | null;
  professionId: number;
  customerId: number;
}
