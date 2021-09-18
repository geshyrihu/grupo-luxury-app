import { AuthService } from 'src/app/shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/shared/services/sidebar.service';
declare var $: any;
@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styles: [],
})
export class SidebarMenuComponent implements OnInit {
  sidebarMenu: any[] = [];

  constructor(private sidebarService: SidebarService) {
    this.sidebarMenu = sidebarService.menu;
  }

  ngOnInit(): void {
    $('[data-widget="treeview"]').Treeview('init');
  }
}
