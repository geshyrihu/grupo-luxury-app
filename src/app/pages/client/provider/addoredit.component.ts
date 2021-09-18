import { AuthService } from '../../../shared/services/auth.service';
import { DataService } from '../../../shared/services/data.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { SelectlistService } from 'src/app/shared/services/selectlist.service';
import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-addoredit',
  templateUrl: './addoredit.component.html',
})
export class AddoreditProviderComponent implements OnInit {
  id = 0;
  cb_Categorie: any[] = [];
  cb_Banks: any[] = [];
  form: FormGroup;
  urlBaseImg = `${environment.base_urlImg}providers/`;
  model: any;
  photoFileUpdate: boolean = false;
  urlLogo = '';
  proveedorCoincidente: any[] = [];
  nameComercialCoincidente: any[] = [];
  valuenNameProvider: string = '';
  valueNameComercialCoincidente: string = '';
  valueRfc: string = 'a';
  rfcCoincidente: string = '';
  cuenta: number;

  tipoProveedor = [
    { value: 1, label: 'Publico' },
    { value: this.authService.InfoUserAuthDto.customerId, label: 'Privado' },
  ];
  constructor(
    private selectListservice: SelectlistService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef,
    private dataService: DataService
  ) {
    selectListservice.getCategories().subscribe((resp) => {
      this.cb_Categorie = resp;
    });
    selectListservice.getBank().subscribe((resp) => {
      this.cb_Banks = resp;
    });
  }

  ngOnInit(): void {
    this.id = this.config.data.id;
    if (this.id !== 0) {
      this.getImem();
    }
    this.form = this.formBuilder.group({
      id: { value: this.id, disabled: true },
      address: ['', Validators.required],
      bankId: ['', Validators.required],
      cellPhoneOne: ['', Validators.required],
      cellPhoneTwo: [''],
      contactOne: ['', Validators.required],
      contactTwo: [''],
      emailOne: ['', Validators.required],
      emailTwo: [''],
      interbankCode: ['', Validators.required],
      nameCheck: ['', Validators.required],
      nameProvider: ['', Validators.required],
      nameComercial: [''],
      pathPhoto: [''],
      paymentAccount: ['', Validators.required],
      phoneOne: ['', Validators.required],
      phoneTwo: [''],
      positionOne: ['', Validators.required],
      positionTwo: [],
      repair: [false],
      rfc: ['', Validators.required],
      sales: [false],
      user: [this.authService.InfoUserAuthDto.id],
      convenio: [''],
      referencia: [''],
      webPage: [''],
      customerId: [1],
    });
  }

  getImem() {
    this.dataService.get(`Providers/${this.id}`).subscribe((resp: any) => {
      this.form.patchValue(resp.body);
      this.urlLogo = `${this.urlBaseImg}${resp.body.pathPhoto}`;
    });
  }
  onSubmit() {
    if (this.form.invalid) {
      Object.values(this.form.controls).forEach((x) => {
        x.markAllAsTouched();
      });
      return;
    } else {
      const model = this.onCreateFormData(this.form.value);
      if (this.id === 0) {
        this.dataService.post(`Providers/`, model).subscribe(
          (resp) => {
            this.ref.close('Registro creado');
          },
          (err) => {
            console.log(err.error);
          }
        );
      } else {
        this.dataService.put(`Providers/${this.id}`, model).subscribe(
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
  onCreateFormData(dto: any) {
    const formData = new FormData();

    // formData.append('categoryId', String(dto.categoryId));
    formData.append('nameProvider', dto.nameProvider);
    formData.append('nameComercial', dto.nameComercial);
    formData.append('rfc', dto.rfc);
    formData.append('address', dto.address);
    if (dto.pathPhoto) {
      formData.append('pathPhoto', dto.pathPhoto);
    }
    formData.append('sales', String(dto.sales));
    formData.append('repair', String(dto.repair));
    formData.append('phoneOne', dto.phoneOne);
    formData.append('phoneTwo', dto.phoneTwo);
    formData.append('webPage', dto.webPage);
    formData.append('contactOne', dto.contactOne);
    formData.append('positionOne', dto.positionOne);
    formData.append('cellPhoneOne', dto.cellPhoneOne);
    formData.append('emailOne', dto.emailOne);
    formData.append('contactTwo', dto.contactTwo);
    formData.append('positionTwo', dto.positionTwo);
    formData.append('cellPhoneTwo', dto.cellPhoneTwo);
    formData.append('emailTwo', dto.emailTwo);
    formData.append('nameCheck', dto.nameCheck);
    formData.append('bankId', String(dto.bankId));
    formData.append('paymentAccount', String(dto.paymentAccount));
    formData.append('interbankCode', String(dto.interbankCode));
    formData.append('user', dto.user);
    formData.append('convenio', dto.convenio);
    formData.append('referencia', dto.referencia);
    formData.append('customerId', dto.customerId);
    return formData;
  }

  // ...Recibiendo archivo emitido
  uploadFile(file: File) {
    this.photoFileUpdate = true;
    this.form.patchValue({ pathPhoto: file });
  }

  buscarCoincidencia(): void {
    this.dataService
      .get('Providers/BuscarCoincidencia/' + this.valuenNameProvider)
      .subscribe(
        (resp: any) => {
          this.proveedorCoincidente = resp.body;
        },
        (err) => {
          console.log(err.error);
        }
      );
  }

  onValidarRFC() {
    this.dataService.get('Providers/ValidarRfc/' + this.valueRfc).subscribe(
      (resp: any) => {
        this.rfcCoincidente = resp.body;
      },
      (err) => {
        console.log(err.error);
      }
    );
  }
  buscarCoincidencianNameComercial(): void {
    this.dataService
      .get('Providers/BuscarCoincidencia/' + this.valueNameComercialCoincidente)
      .subscribe(
        (resp: any) => {
          this.nameComercialCoincidente = resp.body;
        },
        (err) => {
          console.log(err.error);
        }
      );
  }

  get address() {
    return this.form.get('address');
  }
  get bankId() {
    return this.form.get('bankId');
  }
  // get categoryId() {
  //   return this.form.get('categoryId');
  // }
  get cellPhoneOne() {
    return this.form.get('cellPhoneOne');
  }
  get contactOne() {
    return this.form.get('contactOne');
  }
  get emailOne() {
    return this.form.get('emailOne');
  }
  get interbankCode() {
    return this.form.get('interbankCode');
  }
  get nameCheck() {
    return this.form.get('nameCheck');
  }
  get nameProvider() {
    return this.form.get('nameProvider');
  }
  get paymentAccount() {
    return this.form.get('paymentAccount');
  }
  get positionOne() {
    return this.form.get('positionOne');
  }
  get rfc() {
    return this.form.get('rfc');
  }
  get phoneOne() {
    return this.form.get('phoneOne');
  }
}
