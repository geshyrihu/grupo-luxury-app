import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/services/data.service';
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-add-check-list',
  templateUrl: './add-check-list.component.html',
  providers: [DialogService, MessageService],
})
export class AddCheckListComponent implements OnInit {
  data: any[] = [];
  installationId: number = 0;
  constructor(
    private dataService: DataService,
    public messageService: MessageService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {
    this.installationId = this.config.data.installationId;
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
    this.dataService
      .get('CatalogCheckList/GetAsyncAll/' + this.installationId)
      .subscribe(
        (resp: any) => {
          this.data = resp.body;
          Swal.close();
        },
        (err) => {
          this.showToast('error', 'Error', 'Error al cargar la información');
          console.log(err.error);
          Swal.close();
        }
      );
  }
  addCheckList(checkListId: number) {
    this.dataService
      .get(
        `CatalogInstallation/AddCheckList/${checkListId}/${this.installationId}`
      )
      .subscribe(
        (resp) => {
          this.onLoadData();
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
