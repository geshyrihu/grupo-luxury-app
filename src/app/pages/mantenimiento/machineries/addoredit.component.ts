import { AuthService } from 'src/app/shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/services/data.service';
import { DateService } from '../../../shared/services/date.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { EBoolean } from '../../../shared/enums/EBoolean';
import { environment } from 'src/environments/environment';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { SelectlistService } from 'src/app/shared/services/selectlist.service';

@Component({
  selector: 'app-addoredit',
  templateUrl: './addoredit.component.html',
})
export class AddoreditMachineriesComponent implements OnInit {
  urlBaseImg = '';
  id: number = 0;
  user = this.authService.InfoUserAuthDto.id;
  customerId: number = this.authService.InfoUserAuthDto.customerId;
  listCategories: any[] = [];
  optionActive: any[] = [
    { value: 0, label: 'Activo' },
    { value: 1, label: 'Inactivo' },
  ];
  machineryDTO: any;
  photoFileUpdate: boolean = false;
  // ... Formulario
  form: FormGroup;
  constructor(
    private authService: AuthService,
    private dataService: DataService,
    private formBuilder: FormBuilder,
    private getdateService: DateService,
    private selectListService: SelectlistService,
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef
  ) {}

  ngOnInit(): void {
    this.urlBaseImg = `${environment.base_urlImg}customers/${this.authService.customerAuthId}/machinery/`;
    this.selectListService.getCategories().subscribe(
      (resp) => {
        this.listCategories = resp;
      },
      (err) => {
        console.log(err.error);
      }
    );

    this.id = this.config.data.id;
    if (this.id !== 0) {
      this.onLoadData(this.id);
    }
    this.form = this.formBuilder.group({
      id: { value: this.id, disabled: true },
      nameMachinery: ['', [Validators.required, Validators.minLength(5)]],
      ubication: ['', [Validators.required]],
      brand: [''],
      serie: [''],
      model: [''],
      state: [1, [Validators.required]],
      dateOfPurchase: [this.getdateService.getDateNow(), [Validators.required]],
      technicalSpecifications: ['', [Validators.required]],
      observations: [''],
      categoryId: [' ', [Validators.required]],
      customerId: [this.customerId],
      photoPath: [''],
      user: [this.authService.InfoUserAuthDto.id],
    });
  }
  // ...Recibiendo archivo emitido
  uploadFile(file: File) {
    this.photoFileUpdate = true;
    this.form.patchValue({ photoPath: file });
  }
  onLoadData(id: number) {
    this.dataService.get(`Machineries/${id}`).subscribe((resp: any) => {
      this.id = resp.body.id;
      resp.body.dateOfPurchase = this.getdateService.getDateFormat(
        resp.body.dateOfPurchase
      );
      this.form.patchValue(resp.body);
    });
  }
  onSubmit() {
    if (this.form.invalid) {
      Object.values(this.form.controls).forEach((x) => {
        x.markAllAsTouched();
      });
      return;
    }

    const model = this.createFormData(this.form.value);
    if (this.id === 0) {
      this.dataService.post('Machineries', model).subscribe(
        (resp) => {
          this.ref.close('Registro creado');
        },
        (err) => {
          console.log(err.error);
        }
      );
    } else {
      this.dataService.put(`Machineries/${this.id}`, model).subscribe(
        (resp) => {
          this.ref.close('Registro actualizado');
        },
        (err) => {
          console.log(err.error);
        }
      );
    }
  }
  private createFormData(machineryDTO: any): FormData {
    let formData = new FormData();
    formData.append('user', machineryDTO.user);
    formData.append('nameMachinery', machineryDTO.nameMachinery);
    formData.append('ubication', machineryDTO.ubication);
    formData.append('brand', machineryDTO.brand);
    formData.append('serie', machineryDTO.serie);
    formData.append('model', machineryDTO.model);
    formData.append('state', String(machineryDTO.state));
    formData.append('dateOfPurchase', String(machineryDTO.dateOfPurchase));
    formData.append('customerId', String(this.customerId));
    formData.append(
      'technicalSpecifications',
      machineryDTO.technicalSpecifications
    );
    formData.append('observations', machineryDTO.observations);
    formData.append('categoryId', String(machineryDTO.categoryId));
    // ... Si hay un archivo cargado agrega la prop photoPath con su valor
    if (machineryDTO.photoPath) {
      formData.append('photoPath', machineryDTO.photoPath);
    }
    return formData;
  }

  get nameMachinery() {
    return this.form.get('nameMachinery');
  }
  get ubication() {
    return this.form.get('ubication');
  }
  get state() {
    return this.form.get('state');
  }
  get dateOfPurchase() {
    return this.form.get('dateOfPurchase');
  }
  get categoryId() {
    return this.form.get('categoryId');
  }
  get technicalSpecifications() {
    return this.form.get('technicalSpecifications');
  }
}
