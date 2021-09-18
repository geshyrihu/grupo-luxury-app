import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DataService } from 'src/app/shared/services/data.service';
import { SelectlistService } from 'src/app/shared/services/selectlist.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-orden-compra-pdf',
  templateUrl: './orden-compra-pdf.component.html',
  providers: [MessageService],
})
export class OrdenCompraPdfComponent implements OnInit {
  model: any;
  ordenCompraId: number = 0;
  nombreAutorizador = '';
  total: number = 0;
  ordenCompraPresupuesto: any[] = [];
  ordenCompraDetalle: any[];
  cb_unidadMedida: any[] = [];

  totalOrdenCompra: number = 0;
  subtotal: number = 0;
  retencionIva: number = 0;
  iva: number = 0;

  constructor(
    private dataService: DataService,
    private routeActive: ActivatedRoute,
    private selectListService: SelectlistService,
    public messageService: MessageService
  ) {
    this.ordenCompraId = this.routeActive.snapshot.params.id;

    // this.selectListService.getMeasurementUnits().subscribe((resp) => {
    //   this.cb_unidadMedida = resp;
    // });
  }

  ngOnInit(): void {
    this.onLoadData();
  }

  onLoadData() {
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Cargando información...',
    });
    Swal.showLoading();
    this.dataService.get(`OrdenCompra/Pdf/${this.ordenCompraId}`).subscribe(
      (resp: any) => {
        this.model = resp.body;
        this.ordenCompraDetalle = this.model.ordenCompraDetalle;

        for (let n of this.ordenCompraDetalle) {
          this.total += n.total;
        }
        let subTotal = 0;
        let retencionIva = 0;
        let ivaTotal = 0;

        for (let n of this.model.ordenCompraDetalle) {
          subTotal += n.subTotal;
          if (n.unidadMedidaId === 14) {
            retencionIva += n.subTotal;
          }
        }
        for (let n of this.model.ordenCompraDetalle) {
          ivaTotal += n.iva;
        }

        this.retencionIva = retencionIva * 0.06;

        this.subtotal = subTotal;
        this.iva = ivaTotal;

        this.subtotal = subTotal;

        this.total = this.subtotal + this.iva - this.retencionIva;
      },
      (err) => {
        this.showToast('error', 'Error', 'Error al cargar la información');
        console.log(err.error);
      }
    );
    Swal.close();
  }

  onGetOrdenCompraPresupuesto() {
    this.dataService
      .get<any>(
        `OrdenCompraPresupuesto/GetAllForOrdenCompra/${this.ordenCompraId}`
      )
      .subscribe(
        (resp: any) => {
          this.ordenCompraPresupuesto = resp.body;
        },
        (err) => {
          console.log(err.error);
        }
      );
  }
  onLoadOrdenCompraDetalle() {
    this.dataService
      .get<any>(`OrdenCompraDetalle/GetAll/${this.ordenCompraId}`)
      .subscribe(
        (resp: any) => {
          this.ordenCompraDetalle = resp.body;
          for (let n of this.ordenCompraDetalle) {
            this.total += n.total;
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
  showToast(severity: string, summary: string, detail: string): void {
    this.messageService.add({
      severity: severity,
      summary: summary,
      detail: detail,
    });
  }
}
