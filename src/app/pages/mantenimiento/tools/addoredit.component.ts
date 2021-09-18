import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/services/data.service';
import { DateService } from '../../../shared/services/date.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { EBoolean } from '../../../shared/enums/EBoolean';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { SelectlistService } from 'src/app/shared/services/selectlist.service';
import { formDateToString } from 'src/app/shared/helpers/utilities';

@Component({
  selector: 'app-addoredit',
  templateUrl: './addoredit.component.html',
})
export class AddoreditToolsComponent implements OnInit {
  id: number = 0;
  customerId: number = 0;
  urlBaseImg = '';
  file: File;
  model: any;
  photoFileUpdate: boolean = false;

  listCategories: any[] = [{}];
  optionActive: any[] = EBoolean.GetEnum();
  form: FormGroup;
  constructor(
    private authService: AuthService,
    private dataService: DataService,
    private formBuilder: FormBuilder,
    private dateService: DateService,
    private selectListService: SelectlistService,
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef
  ) {}
  ngOnInit(): void {
    this.customerId = this.authService.customerAuthId;
    this.selectListService.getCategories().subscribe((resp) => {
      this.listCategories = resp;
    });

    this.id = this.config.data.id;
    if (this.id !== 0) {
      this.onLoadData();
    }

    this.form = this.formBuilder.group({
      id: { value: this.id, disabled: true },
      nameTool: ['', [Validators.required, Validators.minLength(5)]],
      brand: ['', [Validators.required]],
      serie: [''],
      model: [''],
      photoPath: [''],
      state: [0, [Validators.required]],
      dateOfPurchase: [this.dateService.getDateNow(), [Validators.required]],
      technicalSpecifications: [''],
      observations: [''],
      categoryId: ['', [Validators.required]],
      customerId: [this.customerId],
    });
  }
  onLoadData() {
    this.dataService.get(`Tools/Get/${this.id}`).subscribe((resp: any) => {
      this.model = resp.body;
      resp.body.dateOfPurchase = this.dateService.getDateFormat(
        resp.body.dateOfPurchase
      );
      this.urlBaseImg = `${environment.base_urlImg}customers/${this.customerId}/tools/${this.model.photoPath}`;
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
    const formDataDto = this.onCreateFormData(this.form.value);
    if (this.id === 0) {
      this.dataService.post('Tools', formDataDto).subscribe(
        (resp) => {
          this.ref.close('Registro creado');
        },
        (err) => {
          console.log(err.error);
        }
      );
    } else {
      this.dataService.put(`Tools/${this.id}`, formDataDto).subscribe(
        (resp) => {
          this.ref.close('Registro actualizado');
        },
        (err) => {
          console.log(err.error);
        }
      );
    }
  }
  onCreateFormData(dto: any) {
    let formData = new FormData();

    formData.append('nameTool', dto.nameTool);
    formData.append('brand', dto.brand);
    formData.append('serie', dto.serie);
    formData.append('model', dto.model);
    formData.append('state', String(dto.state));
    formData.append('dateOfPurchase', formDateToString(dto.dateOfPurchase));
    formData.append('technicalSpecifications', dto.technicalSpecifications);
    formData.append('observations', dto.observations);
    formData.append('categoryId', String(dto.categoryId));
    formData.append('user', this.authService.InfoUserAuthDto.id);
    formData.append('customerId', String(dto.customerId));
    if (dto.photoPath) {
      formData.append('photoPath', dto.photoPath);
    }

    return formData;
  }

  get nameTool() {
    return this.form.get('nameTool');
  }
  get brand() {
    return this.form.get('brand');
  }
  get state() {
    return this.form.get('state');
  }
  get dateOfPurchase() {
    return this.form.get('dateOfPurchase');
  }
  get observations() {
    return this.form.get('observations');
  }
  get categoryId() {
    return this.form.get('categoryId');
  }
  // ...Recibiendo archivo emitido
  uploadFile(file: File) {
    this.photoFileUpdate = true;
    this.form.patchValue({ photoPath: file });
  }
}
