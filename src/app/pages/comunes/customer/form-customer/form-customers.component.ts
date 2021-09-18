import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/services/data.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { EBoolean } from '../../../../shared/enums/EBoolean';
import { environment } from 'src/environments/environment';
import { FormBuilder, Validators } from '@angular/forms';
import { formDateToString } from 'src/app/shared/helpers/utilities';
import {
  customerDto,
  customerAddOrEditDto,
} from 'src/app/pages/comunes/customer/interfaces/customer';

const base_urlImg = environment.base_urlImg;

@Component({
  selector: 'app-form-customers',
  templateUrl: './form-customers.component.html',
})
export class FormCustomerComponent implements OnInit {
  id: any = 0;
  // optionActive: any[] = EBoolean.GetEnum();
  optionActive: any[] = [
    { value: true, label: 'Activo' },
    { value: false, label: 'Inactivo' },
  ];
  urlBaseImg = `${environment.base_urlImg}Administration/customer/`;
  model: customerDto;
  photoFileUpdate: boolean = false;

  form = this.formBuilder.group({
    id: { value: this.id, disabled: true },
    active: [true],
    adreess: ['', [Validators.required, Validators.minLength(10)]],
    nameCustomer: ['', [Validators.required, Validators.minLength(5)]],
    phoneOne: ['', Validators.required],
    phoneTwo: ['', Validators.required],
    photoPath: [''],
    register: [new Date(), Validators.required],
    rfc: ['', Validators.required],
  });
  get adreess() {
    return this.form.get('adreess');
  }
  get nameCustomer() {
    return this.form.get('nameCustomer');
  }
  get phoneOne() {
    return this.form.get('phoneOne');
  }
  get phoneTwo() {
    return this.form.get('phoneTwo');
  }
  get register() {
    return this.form.get('register');
  }
  get rfc() {
    return this.form.get('rfc');
  }

  constructor(
    private dataService: DataService,
    private formBuilder: FormBuilder,
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef
  ) {}

  ngOnInit(): void {
    this.id = this.config.data.id;
    if (this.id !== 0) {
      this.onLoadData();
    }
  }

  // ...Recibiendo archivo emitido
  uploadFile(file: File) {
    this.photoFileUpdate = true;
    this.form.patchValue({ photoPath: file });
  }

  onLoadData() {
    this.dataService
      .get<customerAddOrEditDto>(`Customers/${this.id}`)
      .subscribe((resp: any) => {
        this.model = resp.body;
        const register = formDateToString(resp.body.register);
        this.model.register = register;
        this.form.patchValue(this.model);
      });
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    const formData = this.createFormData(this.form.value);
    if (this.id === 0) {
      this.dataService
        .post<customerAddOrEditDto>('Customers', formData)
        .subscribe(
          (resp) => {
            this.ref.close('Cliente creado');
          },
          (err) => {
            console.log(err.error);
          }
        );
    } else {
      this.dataService
        .put<customerAddOrEditDto>(`Customers/${this.id}`, formData)
        .subscribe(
          (resp) => {
            this.ref.close('Datos del cliente actualizado');
          },
          (err) => {
            console.log(err.error);
          }
        );
    }
  }

  private createFormData(
    customerAdCustomerAddOrEdit: customerAddOrEditDto
  ): FormData {
    const formData = new FormData();
    formData.append('active', String(customerAdCustomerAddOrEdit.active));
    formData.append('adreess', customerAdCustomerAddOrEdit.adreess);
    formData.append('nameCustomer', customerAdCustomerAddOrEdit.nameCustomer);
    formData.append('phoneOne', customerAdCustomerAddOrEdit.phoneOne);
    formData.append('phoneTwo', customerAdCustomerAddOrEdit.phoneTwo);
    // ... Si hay un archivo cargado agrega la prop photoPath con su valor
    if (customerAdCustomerAddOrEdit.photoPath) {
      formData.append('photoPath', customerAdCustomerAddOrEdit.photoPath);
    }
    formData.append('register', String(customerAdCustomerAddOrEdit.register));
    formData.append('rfc', customerAdCustomerAddOrEdit.rfc);
    return formData;
  }
}
