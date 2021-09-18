import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/services/data.service';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-tarjeta-producto',
  templateUrl: './tarjeta-producto.component.html',
})
export class TarjetaProductoComponent implements OnInit {
  productoId: number = 0;
  producto: any;
  urlImg: string = `${environment.base_urlImg}Administration/products/`;
  constructor(
    private dataService: DataService,
    public config: DynamicDialogConfig
  ) {
    this.productoId = this.config.data.productoId;
  }

  ngOnInit(): void {
    this.dataService.get(`Productos/${this.productoId}`).subscribe((resp) => {
      this.producto = resp.body;
    });
  }
}
