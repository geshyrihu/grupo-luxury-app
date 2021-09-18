export class EEducationLevel {
  public static GetEnum() {
    const data = [
      { value: 0, label: 'Preescolar' },
      { value: 1, label: 'Primaria' },
      { value: 2, label: 'Secundaria' },
      { value: 3, label: 'Media Superior' },
      { value: 4, label: 'Bachillerato General' },
      { value: 5, label: 'Profesional Técnica' },
      { value: 6, label: 'Bachillerato Tecnológico' },
      { value: 7, label: 'Educación superior' },
    ];
    return data;
  }
}
