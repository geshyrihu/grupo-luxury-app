import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AuthService } from '../../../shared/services/auth.service';
import { DataService } from '../../../shared/services/data.service';

@Component({
  selector: 'app-cuestionario-add-or-edit-pregunta',
  templateUrl: './cuestionario-add-or-edit-pregunta.component.html',
})
export class CuestionarioAddOrEditPreguntaComponent implements OnInit {
  userId = this.authService.InfoUserAuthDto.id;
  cuestionarioId = this.config.data.idCuestionario;

  optionComboBoxActive = [
    {
      name: 'Activa',
      code: true,
    },
    {
      name: 'Inactiva',
      code: false,
    },
  ];
  id = 0;
  form = this.formBuilder.group({
    id: { value: this.id, disabled: true },
    pregunta: ['', Validators.required],
    cuestionarioId: [this.cuestionarioId, Validators.required],
    preguntaActiva: [true, Validators.required],
    applicationUserId: [this.userId, Validators.required],
  });
  get pregunta() {
    return this.form.get('pregunta');
  }
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
      .get<any>(`CuestionarioPreguntas/${this.id}`)
      .subscribe((resp: any) => {
        this.form.patchValue(resp.body);
      });
  }
  onLoadPregunta() {
    this.dataService
      .get<any>(`CuestionarioPreguntas/GetPreguntas/${this.id}`)
      .subscribe((resp: any) => {});
  }
  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    this.id = this.config.data.id;
    if (this.id === 0) {
      this.dataService.post(`CuestionarioPreguntas`, this.form.value).subscribe(
        (resp) => {
          this.ref.close('Registro creado');
        },
        (err) => {
          console.log(err.error);
        }
      );
    } else {
      this.dataService
        .put(`CuestionarioPreguntas/${this.id}`, this.form.value)
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
