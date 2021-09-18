import { environment } from './../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styles: [],
})
export class AuthComponent implements OnInit {
  colorBorder: string = '';
  data: any[] = [];
  year = new Date().getFullYear();
  url_Img = `${environment.base_urlImg}login/`;

  constructor(private dataService: DataService) {}
  ngOnInit(): void {
    this.dataService.get(`SliderCustomers`).subscribe(
      (resp: any) => {
        this.data = resp.body;
      },
      (err) => {
        console.log(err.error);
      }
    );
  }
}
