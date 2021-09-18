export class ETipoGasto {
  public static GetEnum() {
    const data = [
      { value: 0, label: 'Fijo' },
      { value: 1, label: 'Variable' },
      { value: 2, label: 'Extraordinario' },
    ];
    return data;
  }
}
