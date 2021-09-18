export class EStatusOrdenCompra {
  public static GetEnum() {
    const data = [
      { value: 0, label: 'Autorizado' },
      { value: 1, label: 'Denegado' },
      { value: 2, label: 'Pendiente' },
    ];
    return data;
  }
}
