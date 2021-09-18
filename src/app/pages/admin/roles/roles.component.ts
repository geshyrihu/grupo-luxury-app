import { Component } from '@angular/core';
import { DataService } from 'src/app/shared/services/data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
})
export class RolesComponent {
  data: any[] = [];

  constructor(private dataService: DataService) {
    this.onLoadData();
  }

  onLoadData() {
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor...',
    });
    Swal.showLoading();
    this.dataService.get('Roles').subscribe(
      (x: any) => {
        this.data = x.body;
        Swal.close();
      },
      (err) => {
        Swal.fire({
          allowOutsideClick: false,
          icon: 'error',
          title: 'Error',
          text: err.error[''],
        });
      }
    );
  }
}
