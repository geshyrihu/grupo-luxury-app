import { EProductClasificacion } from 'src/app/shared/enums/EProductClasificacion';
export interface Producto {
  id: number;
  nombreProducto: string;
  categoryId: number;
  category: any;
  urlImagen: string;
  marca: string;
  modelo: string;
  clasificacion: EProductClasificacion;
  applicationUserId: string;
}

export interface ProductoAddOrEdit {
  nombreProducto: string;
  categoryId: number;
  urlImagen: File;
  marca: string;
  modelo: string;
  clasificacion: EProductClasificacion;
  applicationUserId: string;
}
