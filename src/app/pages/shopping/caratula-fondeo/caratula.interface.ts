export interface FondeoDto {
  id: number;
  fecha: string;
  acreedor: string;
  factura: string;
  concepto: string;
  importe: number;
  iva: number;
  retencion: number;
  subTotal: number;
  totales: number;
  banco: string;
  cuentaBancaria: string;
  claveInterbancaria: string;
}

export interface FondeoPdfDto {
  fondeoDto: FondeoDto[];
}
