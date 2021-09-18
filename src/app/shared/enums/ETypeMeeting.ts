export class ETypeMeeting {
  public static GetEnum() {
    const data = [
      { value: 0, label: 'Asamblea' },
      { value: 1, label: 'Comité' },
      { value: 2, label: 'Supervisión' },
      { value: 3, label: 'Operación' },
      { value: 4, label: 'Mantenimiento' },
    ];
    return data;
  }
}
