import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { AuthService } from 'src/app/shared/services/auth.service';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-provider-add-or-edit-category',
  templateUrl: './provider-add-or-edit-category.component.html',
})
export class ProviderAddOrEditCategoryComponent implements OnInit {
  cb_categories: any[] = [];
  checked = false;

  providerId: number = 0;
  constructor(
    public config: DynamicDialogConfig,
    private dataService: DataService,
    private authService: AuthService
  ) {
    this.providerId = this.config.data.providerId;
  }

  ngOnInit(): void {
    this.onLoadData();
  }

  onLoadData() {
    this.dataService.get(`Providers/GetCategory/${this.providerId}`).subscribe(
      (resp: any) => {
        this.cb_categories = resp.body;
      },
      (err) => {
        console.log(err.error);
      }
    );
  }

  submit(categoria: any) {
    categoria.select = !categoria.select;
    this.dataService
      .get(
        `Providers/EditCategory/${categoria.value}/${categoria.select}/${this.providerId}/${this.authService.InfoUserAuthDto.id}`
      )
      .subscribe(
        (resp: any) => {
          // this.cb_categories = resp.body;
        },
        (err) => {
          console.log(err.error);
        }
      );
  }
}
