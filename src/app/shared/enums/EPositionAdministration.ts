export class EPositionAdministration {
  public static GetEnum() {
    const data = [
      { value: 0, label: 'Dirección' },
      { value: 1, label: 'Supervisión' },
      { value: 2, label: 'Residente' },
      { value: 3, label: 'Contador' },
      { value: 4, label: 'Asistente' },
      { value: 5, label: 'RecursosHuamanos' },
      { value: 6, label: 'JefeDeMantenimiento' },
      { value: 7, label: 'Abogado' },
      { value: 8, label: 'Sistemas' },
    ];
    return data;
  }
}
