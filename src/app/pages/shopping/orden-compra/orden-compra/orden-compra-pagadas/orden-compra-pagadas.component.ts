import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/services/data.service';
import { CustomerSelectService } from 'src/app/shared/services/customer-select.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-orden-compra-pagadas',
  templateUrl: './orden-compra-pagadas.component.html',
})
export class OrdenCompraPagadasComponent implements OnInit {
  data: any[] = [];
  customerId$: Observable<number>;
  constructor(
    private dataService: DataService,
    private customerSelectService: CustomerSelectService,
    private router: Router
  ) {
    this.onLoadData(1);
    this.customerId$ = this.customerSelectService.getCustomerId$();
  }
  ngOnInit(): void {
    this.customerId$.subscribe((resp) => {
      this.onLoadData(1);
    });
  }

  onLoadData(type: any) {
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Cargando información...',
    });
    Swal.showLoading();
    this.dataService
      .get(
        `OrdenCompra/Pagadas/${this.customerSelectService.customerId}/${type}`
      )
      .subscribe(
        (resp: any) => {
          this.data = resp.body;
          Swal.close();
        },
        (err) => {
          console.log(err.error);
          Swal.close();
        }
      );
  }

  onAddOrEdit(id: number) {
    this.router.navigateByUrl(`shopping/ordenCompra/${id}`);
  }
}
