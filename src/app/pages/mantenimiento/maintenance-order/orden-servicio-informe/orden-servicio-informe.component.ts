import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { formDateToString } from 'src/app/shared/helpers/utilities';
import { DataService } from 'src/app/shared/services/data.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-orden-servicio-informe',
  templateUrl: './orden-servicio-informe.component.html',
  providers: [MessageService],
})
export class OrdenServicioInformeComponent implements OnInit {
  data: any[] = [];
  urlImg: string = '';
  customerId: number = 0;
  monthId: number = 0;
  yearId: number = 0;
  nameCarpetaFecha = '';

  constructor(
    private dataService: DataService,
    private rutaActiva: ActivatedRoute,
    public messageService: MessageService
  ) {
    this.customerId = this.rutaActiva.snapshot.params.customerId;
    this.monthId = this.rutaActiva.snapshot.params.monthId;
    this.yearId = this.rutaActiva.snapshot.params.yearId;
  }

  ngOnInit(): void {
    this.onLoadData();
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
        `OrdenServicios/Informe/${this.customerId}/${this.monthId}/${this.yearId}`
      )
      .subscribe(
        (resp: any) => {
          this.data = resp.body;

          if (this.data.length !== 0) {
            this.nameCarpetaFecha = formDateToString(this.data[0].requestDate);
            this.urlImg = `${environment.base_urlImg}customers/${this.customerId}/ordenServicio/${this.nameCarpetaFecha}/`;
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
  showToast(severity: string, summary: string, detail: string) {
    this.messageService.add({
      severity: severity,
      summary: summary,
      detail: detail,
    });
  }
}
