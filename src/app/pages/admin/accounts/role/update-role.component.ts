import { Component, OnInit } from '@angular/core';

import { DataService } from 'src/app/shared/services/data.service';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { RolesDto } from './interfaces/RolesDto';
import { ECloseModal } from 'src/app/shared/enums/ECloseModal';

@Component({
  selector: 'app-editrole',
  templateUrl: './update-role.component.html',
  providers: [MessageService],
})
export class RoleComponent implements OnInit {
  roles: RolesDto[] = [];
  rolesUpdate: RolesDto[] = [];
  checked = false;
  id: string = '';

  constructor(
    private dataSerivce: DataService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    public messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getRoles();
  }
  getRoles() {
    this.id = this.config.data.id;
    if (this.id == null || this.id == '') {
      return;
    }
    this.dataSerivce
      .get('Accounts/GetRole/' + this.id)
      .subscribe((resp: any) => {
        this.roles = resp.body;
        this.rolesUpdate = this.roles;
      });
  }

  updateRole(roles: any) {
    const url = `Accounts/AddRoleToUser/${this.id}`;
    this.dataSerivce.post(url, roles).subscribe(
      (resp: any) => {
        this.ref.close(ECloseModal.Success);
      },
      (err) => {
        console.log(err.error);
        this.ref.close(ECloseModal.Error);
      }
    );
  }
}
