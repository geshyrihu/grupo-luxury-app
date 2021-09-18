export class EBloodType {
  public static GetEnum() {
    const data = [
      { value: 1, label: 'O Negativo' },
      { value: 2, label: 'O positivo' },
      { value: 3, label: 'A negativo' },
      { value: 4, label: 'A positivo' },
      { value: 5, label: 'B negativo' },
      { value: 6, label: 'B positivo' },
      { value: 7, label: 'AB negativo' },
      { value: 8, label: 'AB positivo' },
    ];
    return data;
  }
}
