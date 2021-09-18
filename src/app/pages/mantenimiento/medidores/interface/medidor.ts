export interface MedidorDto {
  id: number;
  customerId: number;
  medidorCategoriaId: number;
  medidorActivo: boolean;
  fechaRegistro: string;
  numeroMedidor: string;
  descripcion: string;
  consumoDiarioMaximo: number;
}

export interface MedidorAddOrEditDto {
  customerId: number;
  medidorCategoriaId: number;
  medidorActivo: boolean;
  fechaRegistro: string;
  numeroMedidor: string;
  descripcion: string;
  consumoDiarioMaximo: number;
  applicationUserId: string;
}
