import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AuthService } from 'src/app/shared/services/auth.service';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-cuestionario-add-or-edit-respuestas',
  templateUrl: './cuestionario-add-or-edit-respuestas.component.html',
})
export class CuestionarioAddOrEditRespuestasComponent implements OnInit {
  id = 0;
  cuestionarioPreguntaId = this.config.data.cuestionarioPreguntaId;
  userId = this.authService.InfoUserAuthDto.id;
  optionComboBoxActive = [
    {
      name: 'Correcta',
      code: true,
    },
    {
      name: 'Incorrecta',
      code: false,
    },
  ];
  form = this.formBuilder.group({
    id: { value: this.id, disabled: true },
    cuestionarioPreguntaId: [this.cuestionarioPreguntaId, Validators.required],
    respuesta: ['', Validators.required],
    correcta: [false, Validators.required],
    applicationUserId: [this.userId, Validators.required],
  });

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.id = this.config.data.id;
    if (this.id !== 0) {
      this.onLoadData();
    }
  }
  onLoadData() {
    this.dataService
      .get<any>(`PreguntaRespuestas/${this.id}`)
      .subscribe((resp: any) => {
        this.form.patchValue(resp.body);
      });
  }
  get respuesta() {
    return this.form.get('respuesta');
  }
  get correcta() {
    return this.form.get('correcta');
  }
  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    this.id = this.config.data.id;
    if (this.id === 0) {
      this.dataService.post(`PreguntaRespuestas`, this.form.value).subscribe(
        (resp) => {
          this.ref.close('Registro creado');
        },
        (err) => {
          console.log(err.error);
        }
      );
    } else {
      this.dataService
        .put(`PreguntaRespuestas/${this.id}`, this.form.value)
        .subscribe(
          (resp) => {
            this.ref.close('Registro actualizado');
          },
          (err) => {
            console.log(err.error);
          }
        );
    }
  }
}

export interface PreguntaRespuestaAddOrEditDto {
  cuestionarioPreguntaId: number;
  respuesta: string;
  correcta: boolean;
  applicationUserId: string;
}
