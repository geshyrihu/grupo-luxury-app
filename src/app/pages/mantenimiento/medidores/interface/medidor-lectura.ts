import { MedidorDto } from './medidor';

export interface MedidorLecturaDto {
  id: number;
  medidorId: number;
  medidor: MedidorDto;
  fechaRegistro?: string;
  lectura: number;
  applicationUserId: string;
}

export interface MedidorLecturaAddOrEditDto {
  medidorId: number;
  fechaRegistro: string;
  lectura: number;
  applicationUserId: string;
}
