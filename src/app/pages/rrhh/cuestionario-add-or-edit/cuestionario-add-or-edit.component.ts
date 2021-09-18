import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ENivelCuestionario } from 'src/app/shared/enums/ENivelCuestionario';
import { DataService } from 'src/app/shared/services/data.service';
import { SelectlistService } from 'src/app/shared/services/selectlist.service';

@Component({
  selector: 'app-cuestionario-add-or-edit',
  templateUrl: './cuestionario-add-or-edit.component.html',
})
export class CuestionarioAddOrEditComponent implements OnInit {
  id: number = 0;

  selectListProfession: any;
  selectListnivelCuestionario: any[] = [];

  enviando: boolean = false;
  labelButton: string = 'Guardar';

  form = this.formBuilder.group({
    id: { value: this.id, disabled: true },
    professionId: ['', Validators.required],
    nivelCuestionario: ['', Validators.required],
  });
  get professionId() {
    return this.form.get('professionId');
  }
  get nivelCuestionario() {
    return this.form.get('nivelCuestionario');
  }

  constructor(
    private formBuilder: FormBuilder,
    private dataSerivce: DataService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private selectListService: SelectlistService,
    private router: Router
  ) {
    this.selectListService.getProfessions().subscribe((resp) => {
      this.selectListProfession = resp;
    });
  }

  ngOnInit(): void {
    for (let item in ENivelCuestionario) {
      if (isNaN(Number(item))) {
        this.selectListnivelCuestionario.push({
          label: item,
          value: ENivelCuestionario[item],
        });
      }
    }
    this.id = this.config.data.id;
    if (this.id !== 0) {
      this.onLoadData();
    }
  }

  onLoadData() {
    this.dataSerivce
      .get<any>(`Cuestionarios/${this.id}`)
      .subscribe((resp: any) => {
        this.form.patchValue(resp.body);
      });
  }
  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    this.enviando = true;
    this.labelButton = 'Enviando...';

    this.id = this.config.data.id;
    if (this.id === 0) {
      this.dataSerivce.post(`Cuestionarios`, this.form.value).subscribe(
        (resp: any) => {
          this.enviando = false;
          this.labelButton = 'Guardar';
          this.router.navigateByUrl('rrhh/cuestionario/' + resp.body.id);

          this.ref.close('Registro creado');
        },
        (err) => {
          console.log(err.error);
        }
      );
    } else {
      this.dataSerivce
        .put(`Cuestionarios/${this.id}`, this.form.value)
        .subscribe(
          (resp) => {
            this.enviando = false;
            this.labelButton = 'Guardar';
            this.ref.close('Registro actualizado');
          },
          (err) => {
            console.log(err.error);
          }
        );
    }
  }
}
