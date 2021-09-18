import { AuthService } from '../../../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../shared/services/data.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormBuilder, Validators } from '@angular/forms';
import { DirectoryCondominiumAddOrEditDto } from './interfaces/DirectoryCondominiumAddOrEditDto';

@Component({
  selector: 'app-addoredit',
  templateUrl: './addoredit.component.html',
})
export class AddoreditDirectoryCondominiumComponent implements OnInit {
  id: number = 0;
  customerId: number = this.authService.customerAuthId;
  form = this.formBuilder.group({
    id: { value: this.id, disabled: true },
    department: ['', Validators.required],
    customerId: [this.customerId, Validators.required],
    tower: ['', Validators.required],
    user: [''],
  });
  get department() {
    return this.form.get('department');
  }
  get tower() {
    return this.form.get('tower');
  }
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.customerId = this.authService.customerAuthId;
    this.id = this.config.data.id;
    if (this.id !== 0) {
      this.getImem();
    }
  }
  submit() {
    if (this.form.invalid) {
      Object.values(this.form.controls).forEach((x) => {
        x.markAllAsTouched();
      });
      return;
    } else {
      if (this.id === 0) {
        this.dataService
          .post<DirectoryCondominiumAddOrEditDto>(
            `DirectoryCondominium/`,
            this.form.value
          )
          .subscribe(
            (resp) => {
              this.ref.close('Registro creado');
            },
            (err) => {
              console.log(err.error);
            }
          );
      } else {
        this.dataService
          .put<DirectoryCondominiumAddOrEditDto>(
            `DirectoryCondominium/${this.id}`,
            this.form.value
          )
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
  getImem() {
    this.dataService
      .get<DirectoryCondominiumAddOrEditDto>(`DirectoryCondominium/${this.id}`)
      .subscribe((resp: any) => {
        this.form.patchValue(resp.body);
      });
  }
}
