import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DataService } from 'src/app/shared/services/data.service';
import { AuthService } from '../../../../shared/services/auth.service';

@Component({
  selector: 'app-qualification-provider',
  templateUrl: './qualification-provider.component.html',
})
export class QualificationProviderComponent implements OnInit {
  providerId: number = 0;
  qualificationProviderId: number = 0;
  form = this.formBuilder.group({
    applicationUserId: [
      this.authService.InfoUserAuthDto.id,
      Validators.required,
    ],
    providerId: [this.config.data.providerId, Validators.required],
    precio: [0, Validators.required],
    servicio: [0, Validators.required],
    entrega: [0, Validators.required],
  });
  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private authService: AuthService
  ) {
    this.providerId = this.config.data.providerId;
  }

  ngOnInit(): void {
    this.onLoadData();
  }

  onLoadData() {
    this.dataService
      .get(
        `QualificationProviders/${this.authService.InfoUserAuthDto.id}/${this.providerId}`
      )
      .subscribe(
        (resp: any) => {
          console.log(resp.body);
          if (resp.body !== null) {
            this.qualificationProviderId = resp.body.id;
            this.form.patchValue(resp.body);
          }
        },
        (err) => {
          err.error;
        }
      );
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    if (this.qualificationProviderId === 0) {
      this.dataService
        .post(`QualificationProviders`, this.form.value)
        .subscribe(
          (resp) => {
            this.ref.close('Calificación enviada...');
          },
          (err) => {
            console.log(err.error);
          }
        );
    } else {
      this.dataService
        .put(
          `QualificationProviders/${this.qualificationProviderId}`,
          this.form.value
        )
        .subscribe(
          (resp) => {
            this.ref.close('Calificación enviada...');
          },
          (err) => {
            console.log(err.error);
          }
        );
    }
  }
}

export interface QualificationProviderAddOrEditDto {
  applicationUserId: string;
  providerId: number;
  precio: number;
  servicio: number;
  entrega: number;
}
