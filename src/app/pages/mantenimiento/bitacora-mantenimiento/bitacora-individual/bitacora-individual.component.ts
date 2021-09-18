import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/services/data.service';
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { formDateToString } from 'src/app/shared/helpers/utilities';
import { CardUserComponent } from 'src/app/pages/auth/card-user/card-user.component';
@Component({
  selector: 'app-bitacora-individual',
  templateUrl: './bitacora-individual.component.html',
  providers: [DialogService],
})
export class BitacoraIndividualComponent implements OnInit {
  machineryId: number;
  fechaInicio = '';
  fechaTermino = '';
  data: any[];
  constructor(
    public dialogService: DialogService,
    private dataService: DataService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {
    this.machineryId = this.config.data.machineryId;
  }

  ngOnInit(): void {
    this.onSetFechaInitial();
    this.onLoadData();
  }

  onSetFechaInitial() {
    var date = new Date();

    if (this.fechaInicio === '') {
      date.setDate(date.getDate() - 30);
      this.fechaInicio = formDateToString(date);
    }
    if (this.fechaTermino === '') {
      this.fechaTermino = formDateToString(new Date());
    }
  }
  onFilter() {
    this.onSetFechaInitial();
    this.onLoadData();
  }

  onUserCard(userId: string) {
    this.ref = this.dialogService.open(CardUserComponent, {
      data: {
        userId: userId,
      },
      header: 'Tarjeta de Usuario',
      styleClass: 'sizeCardUser',
      closeOnEscape: true,
      baseZIndex: 10000,
    });
    this.ref.onClose.subscribe((resp: any) => {});
  }

  onLoadData() {
    this.dataService
      .get(
        `BitacoraMantenimiento/BitacoraIndividual/${this.machineryId}/${this.fechaInicio}/${this.fechaTermino}`
      )
      .subscribe(
        (resp: any) => {
          this.data = resp.body;
        },
        (err) => {
          console.log(err.error);
        }
      );
  }
}
