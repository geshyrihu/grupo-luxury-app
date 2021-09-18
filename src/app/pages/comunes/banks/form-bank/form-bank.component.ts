import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/services/data.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormBuilder, Validators } from '@angular/forms';
import { Bank } from 'src/app/pages/comunes/banks/interfaces/bank';

@Component({
  selector: 'app-form-bank',
  templateUrl: './form-bank.component.html',
})
export class FormBankComponent implements OnInit {
  id: number = 0;
  form = this.formBuilder.group({
    id: { value: this.id, disabled: true },
    code: ['', Validators.required],
    shortName: ['', [Validators.required, Validators.minLength(4)]],
    largeName: ['', Validators.required],
  });
  get code() {
    return this.form.get('code');
  }
  get shortName() {
    return this.form.get('shortName');
  }
  get largeName() {
    return this.form.get('largeName');
  }

  constructor(
    private formBuilder: FormBuilder,
    private dataSerivce: DataService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {}

  ngOnInit(): void {
    this.id = this.config.data.id;
    if (this.id !== 0) {
      this.onLoadData();
    }
  }
  onLoadData() {
    this.dataSerivce.get<Bank>(`Banks/${this.id}`).subscribe((resp: any) => {
      this.form.patchValue(resp.body);
    });
  }
  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    this.id = this.config.data.id;
    if (this.id === 0) {
      this.dataSerivce.post(`Banks`, this.form.value).subscribe(
        (resp) => {
          this.ref.close('Banco creado');
        },
        (err) => {
          console.log(err.error);
        }
      );
    } else {
      this.dataSerivce.put(`Banks/${this.id}`, this.form.value).subscribe(
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
