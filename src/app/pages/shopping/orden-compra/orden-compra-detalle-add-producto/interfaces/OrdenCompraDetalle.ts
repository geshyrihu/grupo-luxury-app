import { UnidadMedidaDto } from 'src/app/pages/comunes/measurement-units/interfaces/UnidadMedidaDto';
import { Producto } from 'src/app/pages/inventario/productos/interfaces/Producto';

export interface OrdenCompraDetalle {
  id: number;
  ordenCompraId: number;
  productoId: number;
  producto: Producto;
  cantidad: number;
  unidadMedidaId: number;
  unidadMedida: UnidadMedidaDto;
  precio: number;
  descuento: number;
  ivaAplicado: number;
  subTotal: number;
  iva: number;
  total: number;
}
