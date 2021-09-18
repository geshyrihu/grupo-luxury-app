import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CatalogoGastosFijosService } from 'src/app/shared/services/catalogo-gastos-fijos.service';
import { DataService } from 'src/app/shared/services/data.service';
import { SelectlistService } from 'src/app/shared/services/selectlist.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-gastos-fijos-servicios',
  templateUrl: './form-gastos-fijos-servicios.component.html',
})
export class FormGastosFijosServiciosComponent implements OnInit {
  isInRole: boolean;
  catalogoGastosFijosId: number = 0;
  productos: any[] = [];
  urlImagenProducto = environment.base_urlImg + 'Administration/products/';
  mensajeError = false;
  catalogoGastosFijosDetalles: any;
  id: any;
  cb_unidadMedida: any[] = [];
  productosAgregados: any[] = [];
  constructor(
    private dataService: DataService,
    private selectListService: SelectlistService,
    private authService: AuthService,
    public messageService: MessageService,
    private catalogoGastosFijosService: CatalogoGastosFijosService
  ) {
    selectListService.getMeasurementUnits().subscribe((resp) => {
      this.cb_unidadMedida = resp;
    });

    this.catalogoGastosFijosId =
      this.catalogoGastosFijosService.getCatalogoGastosFijosId();
  }

  ngOnInit(): void {
    this.onLoadProducts();
    this.onLoadProductsAgregados();
  }
  onLoadProductsAgregados() {
    this.dataService
      .get(
        `CatalogoGastosFijosDetalles/DetallesOrdenCompraFijos/${this.catalogoGastosFijosId}`
      )
      .subscribe(
        (resp: any) => {
          this.productosAgregados = resp.body;
        },
        (err) => {
          console.log(err.error);
        }
      );
  }

  deleteProductoAgregado(id: number) {
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Procesando solicitud...',
    });
    Swal.showLoading();
    this.dataService.delete(`CatalogoGastosFijosDetalles/${id}`).subscribe(
      (resp) => {
        Swal.close();
        this.showToast('info', 'Info', `Registro borrado!`);
        Swal.close();
        this.onLoadProductsAgregados();
      },
      (err) => {
        this.showToast('error', 'Error!!', 'Error al borrar');
        Swal.close();
        console.log(err.error);
      }
    );
    Swal.close();
  }
  onLoadProducts() {
    this.dataService
      .get(
        'CatalogoGastosFijosDetalles/GetALLCatalogoGastosFijosProductoDto/' +
          this.catalogoGastosFijosId
      )
      .subscribe(
        (resp: any) => {
          this.productos = resp.body;
        },
        (err) => {
          console.log(err.error);
        }
      );
  }

  onSubmit(item: any) {
    if (item.unidadMedidaId === 0 || item.cantidad === 0) {
      this.mensajeError = true;
      return;
    }

    item.catalogoGastosFijosId = this.catalogoGastosFijosId;
    this.dataService.post<any>(`CatalogoGastosFijosDetalles/`, item).subscribe(
      (resp) => {
        this.showToast('success', 'Completado!!', 'Agregado...');
        this.mensajeError = false;
        this.onLoadProducts();
        this.onLoadProductsAgregados();
      },
      (err) => {
        console.log(err.error);
      }
    );
  }

  onUpdateProductoAgregado(item: any) {
    this.dataService
      .put(`CatalogoGastosFijosDetalles/${item.id}`, item)
      .subscribe(
        (resp) => {
          this.showToast('success', 'Completado!!', 'Agregado...');
          this.mensajeError = false;
          this.onLoadProducts();
          this.onLoadProductsAgregados();
        },
        (err) => {
          console.log(err.error);
        }
      );
  }

  showToast(severity: string, summary: string, detail: string) {
    this.messageService.add({
      severity: severity,
      summary: summary,
      detail: detail,
    });
  }
}
