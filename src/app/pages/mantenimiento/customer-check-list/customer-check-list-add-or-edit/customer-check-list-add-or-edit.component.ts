import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/services/data.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormBuilder, Validators } from '@angular/forms';
import { CustomerSelectService } from 'src/app/shared/services/customer-select.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-customer-check-list-add-or-edit',
  templateUrl: './customer-check-list-add-or-edit.component.html',
})
export class CustomerCheckListAddOrEditComponent implements OnInit {
  id: number = 0;
  data: any[] = [];
  applicationUserId: string = '';
  constructor(
    private formBuilder: FormBuilder,
    private dataSerivce: DataService,
    public ref: DynamicDialogRef,
    private customerSelectListService: CustomerSelectService,
    private authService: AuthService
  ) {
    this.applicationUserId = this.authService.InfoUserAuthDto.id;
  }

  ngOnInit(): void {
    this.onLoadData();
  }
  onLoadData() {
    this.dataSerivce
      .get(
        `CatalogInstallation/GetAll/${this.customerSelectListService.customerId}`
      )
      .subscribe(
        (resp: any) => {
          this.data = resp.body;
        },
        (err) => {
          console.log(err.error);
        }
      );
  }
  onSubmit(id: number) {
    const data = {
      customerId: this.customerSelectListService.customerId,
      catalogInstallationId: id,
      applicationUserId: this.applicationUserId,
    };
    this.dataSerivce.post(`CustomerCheckList`, data).subscribe(
      (resp) => {
        this.ref.close('Banco creado');
      },
      (err) => {
        console.log(err.error);
      }
    );
  }
}
