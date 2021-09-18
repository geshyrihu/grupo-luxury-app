export interface MedidorCategoriaDto {
  id: number;
  nombreMedidorCategoria: string;
}

export interface MedidorCategoriaAddOrEditDto {
  nombreMedidorCategoria: string;
  applicationUserId: string;
}
