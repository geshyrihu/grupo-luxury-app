import { AuthService } from 'src/app/shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/services/data.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormBuilder, Validators } from '@angular/forms';
import { requestDto } from 'src/app/pages/comunes/requests/interfaces/request';

@Component({
  selector: 'app-addoredit',
  templateUrl: './form-request.component.html',
})
export class FormRequestComponent implements OnInit {
  id: number = 0;
  form = this.formBuilder.group({
    id: { value: this.id, disabled: true },
    nameRequest: ['', [Validators.required, Validators.minLength(5)]],
  });
  constructor(
    private authService: AuthService,
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef,
    private dataService: DataService,
    private formBuilder: FormBuilder
  ) {}
  ngOnInit(): void {
    this.id = this.config.data.id;
    if (this.id !== 0) {
      this.onLoadData(this.id);
    }
  }

  get nameRequest() {
    return this.form.get('nameRequest');
  }

  onLoadData(id: number) {
    this.dataService.get<Request>(`Requests/${id}`).subscribe((resp: any) => {
      this.form.patchValue(resp.body);
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    this.id = this.config.data.id;
    if (this.id === 0) {
      this.dataService
        .post(
          `Requests/${this.authService.InfoUserAuthDto.id}`,
          this.form.value
        )
        .subscribe(
          (resp) => {
            this.ref.close('Solicitante creado');
          },
          (err) => {
            console.log(err.error);
          }
        );
    } else {
      this.dataService
        .put(
          `Requests/${this.id}/${this.authService.InfoUserAuthDto.id}`,
          this.form.value
        )
        .subscribe(
          (resp) => {
            this.ref.close('Solicitante actualizado');
          },
          (err) => {
            console.log(err.error);
          }
        );
    }
  }
}
