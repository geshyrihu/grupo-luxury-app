import { DataService } from '../../../shared/services/data.service';
import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SliderCustomerDto } from '../../../interfaces/slider-customer/slider.interfaces';
const baseUrlImg = environment.base_urlImg;
@Component({
  selector: 'app-slider-customer',
  templateUrl: './slider-customer.component.html',
  providers: [MessageService],
})
export class SliderCustomerComponent implements OnInit {
  data: SliderCustomerDto[] = [];
  ref: DynamicDialogRef;
  loading: boolean;
  urlImg: string = `${baseUrlImg}login/`;
  imgFileUpdate: boolean = false;
  form: FormGroup;
  constructor(
    private dataSrvice: DataService,
    public messageService: MessageService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.onLoadData();

    this.form = this.formBuilder.group({
      id: [],
      img: [''],
      customerId: [],
    });
  }

  onLoadData() {
    this.loading = true;
    this.dataSrvice.get<SliderCustomerDto[]>(`SliderCustomers`).subscribe(
      (resp: any) => {
        this.loading = false;
        this.data = resp.body;
      },
      (err) => {
        console.log(err.error);
      }
    );
  }

  uploadFile(file: File, customerId: number, id: number) {
    this.imgFileUpdate = true;
    this.form.patchValue({ img: file });
    this.form.patchValue({ customerId: customerId });
    this.form.patchValue({ id: id });

    const formData = this.createFormData(this.form.value);
    this.dataSrvice.put('SliderCustomers/' + id, formData).subscribe(
      (resp) => {
        this.onLoadData();
        this.showToast('success', 'Completado!!', 'Imagen actualizada!');
      },
      (err) => {
        this.showToast('error', 'Error', 'Error al cargar la información');
        console.log(err.error);
      }
    );
  }

  private createFormData(dto: any): FormData {
    const formData = new FormData();
    formData.append('id', dto.id);
    formData.append('customerId', dto.customerId);

    // ... Si hay un archivo cargado agrega la prop photoPath con su valor
    if (dto.img) {
      formData.append('img', dto.img);
    }

    return formData;
  }

  showToast(severity: string, summary: string, detail: string) {
    this.messageService.add({
      severity: severity,
      summary: summary,
      detail: detail,
    });
  }
}
