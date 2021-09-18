import { Component, OnInit } from '@angular/core';

import { DataService } from 'src/app/shared/services/data.service';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { environment } from 'src/environments/environment';
import { userCardDto } from '../../../interfaces/auth/card-user/userCardDto';

@Component({
  selector: 'app-card-user',
  templateUrl: './card-user.component.html',
})
export class CardUserComponent implements OnInit {
  urlImage: string = '';
  userId: string = '';
  user: userCardDto;

  constructor(
    private dataService: DataService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {
    this.userId = this.config.data.userId;
  }

  ngOnInit(): void {
    this.onLoadData();
  }

  onLoadData() {
    this.dataService.get<userCardDto>(`Auth/CardUser/${this.userId}`).subscribe(
      (resp) => {
        this.user = resp.body;
        this.urlImage = `${environment.base_urlImg}Administration/accounts/${this.user.photoPath}`;
      },
      (err) => {
        console.log(err.error);
      }
    );
  }
}
