import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DataService } from 'src/app/shared/services/data.service';
@Component({
  selector: 'app-provider-use',
  templateUrl: './provider-use.component.html',
})
export class ProviderUseComponent implements OnInit {
  data: any[] = [];
  providerId: number = 0;
  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private dataService: DataService
  ) {
    this.providerId = this.config.data.providerId;
  }

  ngOnInit(): void {
    this.onLoadData(this.providerId);
  }

  onLoadData(providerId: number) {
    this.dataService.get(`Providers/Coincidencias/${providerId}`).subscribe(
      (resp: any) => {
        this.data = resp.body;
        console.log(this.data);
      },
      (err) => {
        console.log(err.error);
      }
    );
  }
}
