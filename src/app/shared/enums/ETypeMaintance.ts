export class ETypeMaintance {
  public static GetEnum() {
    const data = [
      { value: 0, label: 'Preventivo' },
      { value: 1, label: 'Correctivo' },
      { value: 2, label: 'Predictivo' },
    ];
    return data;
  }
}
