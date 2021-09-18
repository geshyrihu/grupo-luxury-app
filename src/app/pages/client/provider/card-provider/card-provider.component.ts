import { environment } from './../../../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-card-provider',
  templateUrl: './card-provider.component.html',
})
export class CardProviderComponent implements OnInit {
  model: any;
  id: number;
  urlLogo = '';
  constructor(
    public config: DynamicDialogConfig,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.id = this.config.data.id;
    if (this.id !== null) {
      this.onLoadItem();
    }
  }
  onLoadItem() {
    this.dataService.get(`Providers/${this.id}`).subscribe((resp: any) => {
      this.urlLogo = `${environment.base_urlImg}providers/${resp.body.pathPhoto}`;
      this.model = resp.body;
    });
  }
}
