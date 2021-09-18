import { FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/services/data.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-orden-compra-status',
  templateUrl: './orden-compra-status.component.html',
})
export class OrdenCompraStatusComponent implements OnInit {
  ordenCompraId: number = 0;
  ordenCompraStatus: any;
  form = this.formBuilder.group({
    id: [0],
    ordenCompraId: [0],
    sePago: [false],
    seRecibio: [false],
    recibidoPor: [''],
    factura: [''],
  });
  constructor(
    private dataService: DataService,
    private formBuilder: FormBuilder,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    public messageService: MessageService
  ) {
    this.ordenCompraId = this.config.data.ordenCompraId;
  }

  ngOnInit(): void {
    this.onLoadData();
  }

  onLoadData() {
    this.dataService.get(`OrdenCompraStatus/${this.ordenCompraId}`).subscribe(
      (resp: any) => {
        this.ordenCompraStatus = resp.body;
        this.form.patchValue(resp.body);
      },
      (err) => {
        console.log(err.error);
      }
    );
  }
  onSubmit() {
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Cargando información...',
    });
    Swal.showLoading();
    this.dataService
      .put(`OrdenCompraStatus/${this.ordenCompraStatus.id}`, this.form.value)
      .subscribe(
        (resp) => {
          this.ref.close('Datos Actualizados');
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
