import { Component, OnInit } from '@angular/core';
import { CrudSalidasComponent } from './crud-salidas.component';
import { CustomerSelectService } from 'src/app/shared/services/customer-select.service';
import { DataService } from 'src/app/shared/services/data.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-index-salidas',
  templateUrl: './index-salidas.component.html',
  providers: [DialogService, MessageService],
})
export class IndexSalidasComponent implements OnInit {
  data: any[] = [];
  ref: DynamicDialogRef;
  customerId$: Observable<number>;

  // Permisos
  SuperUsuario: boolean = true;

  constructor(
    private authService: AuthService,
    private dataService: DataService,
    public dialogService: DialogService,
    public messageService: MessageService,
    private customerSelectService: CustomerSelectService
  ) {
    this.SuperUsuario = authService.validationRole('SuperUsuario');
    this.onLoadData();
    this.customerId$ = this.customerSelectService.getCustomerId$();
  }
  ngOnInit(): void {
    this.customerId$.subscribe((resp) => {
      this.onLoadData();
    });
  }

  onLoadData() {
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Cargando información...',
    });
    Swal.showLoading();
    this.dataService
      .get<any[]>(
        `SalidaProductos/GetSalidaProductos/${this.customerSelectService.customerId}`
      )
      .subscribe(
        (resp: any) => {
          this.data = resp.body;
          Swal.close();
        },
        (err) => {
          this.showToast('error', 'Error', 'Error al cargar la información');
          console.log(err.error);
          Swal.close();
        }
      );
  }
  onDelete(data: any) {
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Procesando solicitud...',
    });
    Swal.showLoading();
    this.dataService.delete(`SalidaProductos/${data.id}`).subscribe(
      (resp) => {
        this.showToast('info', 'Info', `${data.id} Borrado!`);
        Swal.close();
        this.onLoadData();
      },
      (err) => {
        this.showToast('error', 'Error', 'Error al intentar borrar');
        Swal.close();
        console.log(err.error);
      }
    );
  }

  onAddEntrada(data: any) {
    this.ref = this.dialogService.open(CrudSalidasComponent, {
      data: {
        id: data.id,
        idProducto: data.idProducto,
        nombreProducto: data.nombreProducto,
        idInventarioProducto: data.idInventarioProducto,
      },
      header: 'Salida de Productos',
      styleClass: 'anchoModal',
      closeOnEscape: true,
      baseZIndex: 10000,
    });
    this.ref.onClose.subscribe((resp: string) => {
      this.onLoadData();

      if (resp !== undefined) {
        this.onLoadData();
        this.showToast('success', 'Completado!!', resp);
      }
    });
  }

  showToast(severity: string, summary: string, detail: string) {
    this.messageService.add({
      severity: severity,
      summary: summary,
      detail: detail,
    });
  }
}
