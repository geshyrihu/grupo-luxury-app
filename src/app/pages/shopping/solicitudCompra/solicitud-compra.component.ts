import { PdfSolicitudCompraService } from '../../../shared/services/pdf-solicitud-compra.service';
import { DateService } from '../../../shared/services/date.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DataService } from 'src/app/shared/services/data.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { AddProductoComponent } from './add-producto.component';
import { EditProductoComponent } from './edit-producto.component';
import { CreateOrdenCompraComponent } from '../orden-compra/orden-compra/create-orden-compra/create-orden-compra.component';
import { EStatusCompra } from 'src/app/shared/helpers/pipes/statusCompra.pipe';

@Component({
  selector: 'app-edit-purchase-solicita',
  templateUrl: './solicitud-compra.component.html',
  providers: [DialogService, MessageService, ConfirmationService],
})
export class SolicitudCompraComponent implements OnInit {
  id: number = 0;
  solicitudCompra: any;
  idAuth: string = '';
  cb_Status = EStatusCompra.GetEnum();
  superUsuario = false;
  ref: DynamicDialogRef;
  SolicitudCompraDetalle: any[] = [];
  form: FormGroup;
  imprimir = false;
  cotizacionesRelacionadas: any[] = [];

  constructor(
    private authService: AuthService,
    private dataService: DataService,
    private dateService: DateService,
    private formBuilder: FormBuilder,
    private pdfSolicitudCompraService: PdfSolicitudCompraService,
    private routeActive: ActivatedRoute,
    private router: Router,
    public dialogService: DialogService,
    public messageService: MessageService
  ) {
    this.routeActive.params.subscribe((resp) => {
      this.id = resp['id'];
    });
    this.idAuth = authService.InfoUserAuthDto.id;
    this.superUsuario = this.authService.validationRole('SuperUsuario');
  }

  ngOnInit(): void {
    this.createForm();
    if (Number(this.id) !== 0) {
      this.onLoadData();
      this.onCotizacionesRelacionadas();
    }
  }
  createForm() {
    return (this.form = this.formBuilder.group({
      id: { value: this.id, disabled: true },
      customerId: [this.authService.customerAuthId],
      fechaSolicitud: [],
      solicita: ['', Validators.required],
      equipoOInstalacion: ['', Validators.required],
      justificacionGasto: ['', Validators.required],
      estatus: [2],
      folio: [''],
      applicationUserId: [this.idAuth],
    }));
  }
  onCotizacionesRelacionadas() {
    this.dataService
      .get(`OrdenCompra/CotizacionesRelacionadas/${this.id}`)
      .subscribe(
        (resp: any) => {
          this.cotizacionesRelacionadas = resp.body;
          console.log(
            'cotizacionesRelacionadas: ',
            this.cotizacionesRelacionadas
          );
        },
        (err) => {
          console.log(err.error);
        }
      );
  }
  onLoadData() {
    // this.dataService.get(`SolicitudCompra/${this.id}`).subscribe(
    this.dataService
      .get(`SolicitudCompra/GetSolicitudCompraIndividual/${this.id}`)
      .subscribe(
        (resp: any) => {
          this.solicitudCompra = resp.body;
          resp.body.fechaSolicitud = this.dateService.getDateFormat(
            resp.body.fechaSolicitud
          );
          this.form.patchValue(resp.body);
          // ...asiganción de folio a servicio de PDF
          this.pdfSolicitudCompraService.setfolioCotizacion(resp.body.folio);
          this.SolicitudCompraDetalle =
            this.solicitudCompra.solicitudCompraDetalle;

          Swal.close();
        },
        (err) => {
          this.showToast('error', 'Error', 'Error al cargar la información');
          console.log(err.error);
        }
      );
  }
  onPdf(idSolicitudCompra: number) {
    this.pdfSolicitudCompraService.setidSolicitudCompra(idSolicitudCompra);
    this.router.navigateByUrl('report/pdfSolicitudCompra');
  }
  onCuadroComparativo(idSolicitudCompra: number) {
    this.router.navigateByUrl(
      `shopping/cuadroComparativo/${idSolicitudCompra}`
    );
  }
  onSubmit() {
    if (this.form.invalid) {
      Object.values(this.form.controls).forEach((x) => {
        x.markAllAsTouched();
      });
      return;
    }
    if (Number(this.id) === 0) {
      this.dataService.post(`SolicitudCompra/`, this.form.value).subscribe(
        (resp: any) => {
          this.id = Number(resp.body.id);
          this.showToast('success', 'Completado!!', 'Guardado');
          this.onLoadData();
        },
        (err) => {
          this.showToast('error', 'Error', 'Error al cargar la información');
          console.log(err.error);
        }
      );
    } else {
      this.dataService
        .put(`SolicitudCompra/${this.id}`, this.form.value)
        .subscribe(
          (resp) => {
            this.showToast('success', 'Completado!!', 'Actualizado');
          },
          (err) => {
            this.showToast('error', 'Error', 'Error al cargar la información');
            console.log(err.error);
          }
        );
    }
  }
  addProduct(data: any) {
    this.ref = this.dialogService.open(AddProductoComponent, {
      data: {
        solicitudCompraId: this.solicitudCompra.id,
        id: data.id,
      },
      header: 'Agregar ',
      styleClass: 'anchoModal',
      width: '1200px',
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
  editProduct(data: any) {
    this.ref = this.dialogService.open(EditProductoComponent, {
      data: {
        solicitudCompraId: this.id,
        id: data.id,
      },
      header: 'Editar Producto',
      width: '600px',
      closeOnEscape: true,
      baseZIndex: 10000,
    });
    this.ref.onClose.subscribe((resp: string) => {
      if (resp !== undefined) {
        this.onLoadData();
        this.showToast('success', 'Completado!!', resp);
      }
    });
  }
  onModalCreateOrdenCompra() {
    this.ref = this.dialogService.open(CreateOrdenCompraComponent, {
      data: {
        solicitudCompraId: this.id,
        folioSolicitudCompra: this.solicitudCompra.folio,
      },
      header: 'Crear Orden de compra',
      width: '1000px',
      closeOnEscape: true,
      baseZIndex: 10000,
    });
    this.ref.onClose.subscribe((ordenCompraId: number) => {
      if (ordenCompraId !== undefined) {
        this.router.navigateByUrl(`shopping/ordenCompra/${ordenCompraId}`);
      }
    });
  }
  onDeleteProduct(data: any) {
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Procesando solicitud...',
    });
    Swal.showLoading();
    this.dataService.delete(`SolicitudCompraDetalle/${data.id}`).subscribe(
      (resp) => {
        this.showToast('info', 'Info', `Registro borrado!`);
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
  get fechaSolicitud() {
    return this.form.get('fechaSolicitud');
  }
  get solicita() {
    return this.form.get('solicita');
  }
  get equipoOInstalacion() {
    return this.form.get('equipoOInstalacion');
  }
  get justificacionGasto() {
    return this.form.get('justificacionGasto');
  }
  get estatus() {
    return this.form.get('estatus');
  }
  showToast(severity: string, summary: string, detail: string) {
    this.messageService.add({
      severity: severity,
      summary: summary,
      detail: detail,
    });
  }

  // Navegar a la Orden de compra
  onAddOrEdit(id: number) {
    this.router.navigateByUrl(`shopping/ordenCompra/${id}`);
  }
}
