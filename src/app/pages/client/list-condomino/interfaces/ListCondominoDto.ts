import { EHabitant } from 'src/app/shared/enums/EHabitant';

export interface ListCondominoDto {
  id: number;
  habitant: EHabitant | null;
  nameDirectoryCondominium: string;
  extencion: string;
  fixedPhone: string;
  cellPhone: string;
  mail: string;
  directoryCondominiumId: number;
  directoryCondominium: string;
}
