export interface CuestionarioPreguntaAddOrEditDto {
  id: number;
  pregunta: string;
  cuestionarioId: number;
  preguntaActiva: boolean;
  applicationUserId: string;
}
