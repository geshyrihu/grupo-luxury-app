import { AuthService } from 'src/app/shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { CustomerSelectService } from 'src/app/shared/services/customer-select.service';
import { DataService } from 'src/app/shared/services/data.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { EMonth } from 'src/app/shared/enums/EMonth';
import { environment } from 'src/environments/environment';
import { EStatus } from '../../../shared/enums/EStatus';
import { formDateToString } from 'src/app/shared/helpers/utilities';
import { FormUploadImgComponent } from './form-upload-img/form-upload-img.component';
import { MessageService, SelectItem } from 'primeng/api';
import { Observable } from 'rxjs';
import { SelectlistService } from 'src/app/shared/services/selectlist.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

const date = new Date();
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  providers: [DialogService, MessageService],
})
export class IndexMaintenanceOrderComponent implements OnInit {
  anio = date.getFullYear();
  cb_Providers: any[] = [];
  cb_Status: SelectItem[] = EStatus.GetEnum();
  cb_Months: any[] = EMonth.GetEnum();
  data: any[] = [];
  month = date.getMonth();
  observations: [''];
  ref: DynamicDialogRef;
  urlImg: string = '';
  nameCarpetaFecha = '';
  customerId$: Observable<number>;

  // Permisos
  Residente: boolean = true;
  SuperUsuario: boolean = true;
  Mantenimiento: boolean = true;
  constructor(
    private dataService: DataService,
    private authService: AuthService,
    private selectListService: SelectlistService,
    public messageService: MessageService,
    public dialogService: DialogService,
    private customerSelectService: CustomerSelectService,
    private router: Router
  ) {
    this.Residente = authService.validationRole('Residente');
    this.SuperUsuario = authService.validationRole('SuperUsuario');
    this.Mantenimiento = authService.validationRole('Mantenimiento');
    this.getProviders();
    this.actualizarOrdenesDeSerivcio();

    this.customerId$ = this.customerSelectService.getCustomerId$();
  }
  ngOnInit(): void {
    this.customerId$.subscribe((resp) => {
      this.getProviders();
      this.actualizarOrdenesDeSerivcio();
    });
  }

  actualizarOrdenesDeSerivcio() {
    this.dataService
      .get(
        `OrdenServicios/UpdateOrdes/${this.customerSelectService.customerId}/${this.month}`
      )
      .subscribe(
        (resp) => {
          this.onLoadData();
        },
        (err) => {
          console.log(err.error);
        }
      );
  }
  onModalFormUploadImg(id: number) {
    this.ref = this.dialogService.open(FormUploadImgComponent, {
      data: {
        id: id,
      },
      header: 'Cargar Imagenes',
      styleClass: 'anchoModal',
      closeOnEscape: true,
      baseZIndex: 10000,
    });
    this.ref.onClose.subscribe((resp: any) => {
      this.onLoadData();
    });
  }
  onLoadData() {
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor...',
    });
    Swal.showLoading();
    this.dataService
      .get(
        `OrdenServicios/GetAll/${this.customerSelectService.customerId}/${
          this.month + 1
        }/${this.anio}`
      )
      .subscribe(
        (resp: any) => {
          this.data = resp.body;
          if (this.data.length !== 0) {
            this.nameCarpetaFecha = formDateToString(this.data[0].requestDate);
            this.urlImg = `${environment.base_urlImg}customers/${this.customerSelectService.customerId}/ordenServicio/${this.nameCarpetaFecha}/`;
          }

          Swal.close();
        },
        (err) => {
          this.showToast('error', 'Error', 'Error al cargar la información');
          console.log(err.error);
          Swal.close();
        }
      );
  }
  update(ordenServicio: any) {
    this.dataService
      .put(`OrdenServicios/${ordenServicio.id}`, ordenServicio)
      .subscribe(
        (resp) => {
          this.showToast('success', 'Completado!!', 'Datos actualizados');
          this.onLoadData();
        },
        (err) => {
          this.showToast('error', 'Error', 'Error al intentar actualizar');
          console.log(err.error);
        }
      );
  }
  deleteImg(id: number): void {
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Procesando solicitud...',
    });
    Swal.showLoading();
    this.dataService.delete(`OrdenServicios/DeleteImg/${id}`).subscribe(
      (resp) => {
        Swal.close();
        this.showToast('info', 'Info', `Registro Borrado!`);
        Swal.close();
        this.onLoadData();
      },
      (err) => {
        this.showToast('error', 'Error!!', 'Error al borrar');
        Swal.close();
        console.log(err.error);
      }
    );
    Swal.close();
  }
  showToast(severity: string, summary: string, detail: string) {
    this.messageService.add({
      severity: severity,
      summary: summary,
      detail: detail,
    });
  }
  getProviders() {
    this.selectListService.getProviders().subscribe((resp) => {
      this.cb_Providers = resp;
    });
  }
  selectYear() {
    if (this.anio.toString().length === 0) {
      return;
    }
    this.onLoadData();
  }
  selectMonth(event: any) {
    this.month = event;
    this.actualizarOrdenesDeSerivcio();
    this.onLoadData();
  }

  makePDF() {
    this.router.navigateByUrl(
      'maintenance/maintenanceOrdersInforme/' +
        this.customerSelectService.customerId +
        '/' +
        (Number(this.month) + 1) +
        '/' +
        this.anio
    );
  }
}
