import { PdfSolicitudCompraService } from '../../../shared/services/pdf-solicitud-compra.service';
import { DataService } from 'src/app/shared/services/data.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-pdf-solicitud-compra',
  templateUrl: './pdf-solicitud-compra.component.html',
})
export class PdfSolicitudCompraComponent implements OnInit {
  @ViewChild('htmlData') htmlData: ElementRef;
  idSolicituCompra = 0;
  folioCotizacion = '';
  model: any;
  constructor(
    private dataService: DataService,
    private pdfSolicitudCompraService: PdfSolicitudCompraService,
    private router: Router
  ) {
    this.idSolicituCompra =
      this.pdfSolicitudCompraService.getidSolicitudCompra();
    this.folioCotizacion = this.pdfSolicitudCompraService.getfolioCotizacion();
  }
  ngOnInit(): void {
    if (this.idSolicituCompra == 0) {
      this.router.navigateByUrl('shopping/purchaseRequest');
    }
    this.dataService
      .get(
        `SolicitudCompra/GetSolicitudCompraIndividual/${this.idSolicituCompra}`
      )
      .subscribe((resp: any) => {
        console.log(resp.body);
        this.model = resp.body.solicitudCompraDetalle;
      });
  }
}
