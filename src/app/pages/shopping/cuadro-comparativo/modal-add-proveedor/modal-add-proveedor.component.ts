import { DataService } from 'src/app/shared/services/data.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { SelectlistService } from 'src/app/shared/services/selectlist.service';
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { AddoreditProviderComponent } from 'src/app/pages/client/provider/addoredit.component';
import { SelectItem } from 'primeng/api/selectitem';

@Component({
  selector: 'app-modal-add-proveedor',
  templateUrl: './modal-add-proveedor.component.html',
  providers: [DialogService],
})
export class ModalAddProveedorComponent implements OnInit {
  form: FormGroup;
  cb_Proveedor: any[] = [];
  proveedor: SelectItem;
  proveedorResult: any[] = [];
  constructor(
    private selectListService: SelectlistService,
    private formBuilder: FormBuilder,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private authService: AuthService,
    private dataService: DataService,
    public dialogService: DialogService
  ) {
    // this.selectListService.getProviders().subscribe((resp) => {
    //   this.cb_Proveedor = resp;
    // });
    this.onLoadProviders();
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      providerId: ['', { validators: [Validators.required] }],
      fechaCotizacion: ['', Validators.required],
      numeroCotizacion: [''],
    });
  }

  filtrarProveedor(event: any) {
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.cb_Proveedor.length; i++) {
      let country = this.cb_Proveedor[i];
      if (country.label.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(country);
      }
    }
    this.proveedorResult = filtered;
  }
  onLoadProviders() {
    this.dataService
      .get(
        `CotizacionProveedor/GetProviders/${this.config.data.solicitudCompraId}`
      )
      .subscribe((resp: any) => {
        this.cb_Proveedor = resp.body;
      });
  }

  onSubmit() {
    const model = {
      solicitudCompraId: this.config.data.solicitudCompraId,
      // providerId: this.form.get('providerId').value,
      providerId: this.proveedor.value,
      fechaCotizacion: this.form.get('fechaCotizacion').value,
      numeroCotizacion: this.form.get('numeroCotizacion').value,
      applicationUserId: this.authService.InfoUserAuthDto.id,
    };

    this.dataService.post('CotizacionProveedor', model).subscribe(
      (resp) => {
        this.ref.close('Proveedor Agregado');
      },
      (err) => {
        console.log(err.error);
      }
    );
  }
  onModalAddProvider() {
    this.ref.close();
    this.ref = this.dialogService.open(AddoreditProviderComponent, {
      data: {
        id: 0,
      },
      header: 'Agregar Proveedor',
      styleClass: 'anchoModalOperationReport',
      baseZIndex: 10000,
      closeOnEscape: true,
    });
    this.ref.onClose.subscribe((resp: any) => {
      this.onLoadProviders();
      // if (resp !== undefined) {
      //   this.onLoadProviders();
      // }
    });
  }
}

class combo {
  value: number;
  label: string;
}
