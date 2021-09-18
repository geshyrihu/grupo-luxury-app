export class EMaritalStatus {
  public static GetEnum() {
    const data = [
      { value: 0, label: 'Casado' },
      { value: 1, label: 'Conviviente' },
      { value: 2, label: 'Anulado' },
      { value: 3, label: 'Separado' },
      { value: 4, label: 'Viudo' },
      { value: 5, label: 'Soltero' },
      { value: 6, label: 'Union Libre' },
    ];
    return data;
  }
}
