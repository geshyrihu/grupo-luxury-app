export class EStatus {
  public static GetEnum() {
    const data = [
      { value: 0, label: 'Pendiente' },
      { value: 3, label: 'En proceso' },
      { value: 1, label: 'Terminado' },
      { value: 2, label: 'No Autorizado' },
    ];
    return data;
  }
}
