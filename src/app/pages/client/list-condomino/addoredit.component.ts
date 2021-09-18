import { AuthService } from 'src/app/shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/services/data.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { EHabitant } from '../../../shared/enums/EHabitant';
import { FormBuilder, Validators } from '@angular/forms';
import { SelectlistService } from 'src/app/shared/services/selectlist.service';

@Component({
  selector: 'app-addoredit',
  templateUrl: './addoredit.component.html',
})
export class AddoreditListCondominoComponent implements OnInit {
  id: number = 0;
  customerId: number = this.authService.customerAuthId;
  cb_DirectoryCondominium: any[] = [];
  cb_Habitant: any[] = EHabitant.GetEnum();
  form = this.formBuilder.group({
    id: { value: this.id, disabled: true },
    customerId: [this.customerId],
    cellPhone: ['', Validators.required],
    directoryCondominiumId: ['', Validators.required],
    extencion: [''],
    fixedPhone: [''],
    habitant: ['', Validators.required],
    mail: [
      '',
      {
        validators: [
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
        ],
      },
    ],
    nameDirectoryCondominium: ['', Validators.required],
    user: [''],
  });
  get directoryCondominiumId() {
    return this.form.get('directoryCondominiumId');
  }
  get habitant() {
    return this.form.get('habitant');
  }
  get cellPhone() {
    return this.form.get('cellPhone');
  }
  get nameDirectoryCondominium() {
    return this.form.get('nameDirectoryCondominium');
  }
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef,
    private dataService: DataService,
    private selectListService: SelectlistService
  ) {}

  ngOnInit(): void {
    this.customerId = this.authService.customerAuthId;
    this.selectListService.getDirectoryCondominium().subscribe((resp) => {
      this.cb_DirectoryCondominium = resp;
    });
    this.id = this.config.data.id;
    if (this.id !== 0) {
      this.getImem();
    }
  }
  onSubmit() {
    if (this.form.invalid) {
      Object.values(this.form.controls).forEach((x) => {
        x.markAllAsTouched();
      });
      return;
    } else {
      if (this.id === 0) {
        this.dataService.post(`ListCondomino/`, this.form.value).subscribe(
          (resp) => {
            this.ref.close('Registro Creada');
          },
          (err) => {
            console.log(err.error);
          }
        );
      } else {
        this.dataService
          .put(`ListCondomino/${this.id}`, this.form.value)
          .subscribe(
            (resp) => {
              this.ref.close('Registro Actualizado');
            },
            (err) => {
              console.log(err.error);
            }
          );
      }
    }
  }
  getImem() {
    this.dataService.get(`ListCondomino/${this.id}`).subscribe((resp: any) => {
      this.form.patchValue(resp.body);
    });
  }
}
